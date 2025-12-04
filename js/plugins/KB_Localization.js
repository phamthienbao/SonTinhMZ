/*:
 * @target MZ
 * @plugindesc [v2.5] Multi-language system & Language Picker interface (KB Edition).
 * @author KB (Dev)
 *
 * @help
 * ============================================================================
 * _  __ ____    _                    _ _           _   _ 
 * | |/ /|  _ \  | |    ___   ___ __ _| (_)______ _ | |_(_) ___  _ __ 
 * | ' / | |_) | | |   / _ \ / __/ _` | | |_  / _` || __| |/ _ \| '_ \ 
 * | . \ |  _ <  | |__| (_) | (_| (_| | | |/ / (_| || |_| | (_) | | | |
 * |_|\_\|_| \_\ |_____\___/ |___\__,_|_|_/___\__,_| \__|_|\___/|_| |_|
 * * ============================================================================
 * ## INTRODUCTION
 * ============================================================================
 * Exclusive plugin for managing multi-language projects. 
 * Integrates the "Language Picker" feature (Select Language) when New Game is selected.
 * Fully compatible with KB_TitleCommands to correctly hide the old UI elements.
 *
 * * Version V2.5: Updated Picker Language interface: Larger window, supports
 * * Touch/Click on language change arrows and the confirmation OK button. OK button uses 
 * * a custom image (requires img/system/Button_OK.png).
 *
 * * IMPORTANT SETUP ORDER:
 * * 1. KB_CoreEngine.js (TOP)
 * * 2. KB_TitleCommands.js
 * * 3. KB_Localization.js (BOTTOM)
 *
 * ============================================================================
 * ## SETUP GUIDE
 * ============================================================================
 * 1. INSTALLATION: 
 * - Place KB_CoreEngine.js at the top.
 * - Place KB_Localization.js below KB_CoreEngine.js and KB_TitleCommands.js.
 *
 * 2. FOLDER & DATA PREPARATION:
 * - Root folder: data/locales/
 * - Create subfolders in "data/locales/" based on Language Codes (e.g., vi, en).
 * - Place translation files (with the same name) into the corresponding folders.
 * (Example: data/locales/vi/General.csv, data/locales/en/General.csv)
 *
 * 3. PLUGIN MANAGER CONFIGURATION:
 * - **Available Locales**: Enter the language codes (e.g., vi, en).
 * - **Data Type**: Select the file type you use (CSV or JSON).
 * - **Data Files**: Enter the NAMES of the data files (e.g., General, Quests). DO NOT include .csv or .json extension.
 * * 4. FLAG & OK BUTTON IMAGE PREPARATION:
 * - Flag image: flag_[LanguageCode].png (Example: flag_vi.png).
 * - **OK Button Image**: Button_OK.png
 * - Copy both into the folder: img/system/
 *
 * ============================================================================
 * @param --- Language Configuration ---
 * @default
 *
 * @param Default Language
 * @text Default Language
 * @desc The language code to run on first launch (vi, en, jp...).
 * @default vi
 *
 * @param Available Locales
 * @text Available Language Codes
 * @desc List of available language codes, separated by commas (Example: vi, en, jp).
 * @default vi, en
 *
 * @param --- Data Configuration ---
 * @default
 *
 * @param Data Root Folder
 * @text Root Folder
 * @desc The root folder containing the language folders. (Default: locales)
 * @default locales
 *
 * @param Data Type
 * @text Data File Type
 * @desc Select the data file type to load. (CSV or JSON)
 * @type select
 * @option CSV
 * @option JSON
 * @default CSV
 *
 * @param Data Files
 * @text Common Data File Names
 * @desc Enter the NAMES of the data files, separated by commas (Example: General, Quests). DO NOT include .csv/.json extension.
 * @default Languages
 * @type string
 *
 * @param --- UI Features ---
 * @default
 *
 * @param Show on Title
 * @text Language Command (Title Menu)
 * @desc Display the "Language" command line in the main menu?
 * @type boolean
 * @default true
 *
 * @param Show in Options
 * @text Language Option (Options Menu)
 * @desc Display the "Language" option in the Options Menu?
 * @type boolean
 * @default true
 *
 * @param New Game Picker
 * @text Picker on New Game
 * @desc Display the language selection interface + flag when New Game is pressed?
 * @type boolean
 * @default true
 */

// Requires KB_CoreEngine.js to be enabled and placed above.
if (!Imported.KB_Core) {
    throw new Error("This plugin requires KB_CoreEngine.js to work! Please place it above.");
}

(() => {
    const pluginName = "KB_Localization";
    const params = PluginManager.parameters(pluginName);
    
    // --- PARAMETER RETRIEVAL AND PARSING ---
    const dataRootFolder = params['Data Root Folder'] || 'locales';
    const dataType = params['Data Type'].toUpperCase();
    const fileExtension = dataType === 'CSV' ? '.csv' : '.json';
    
    const dataFilesStr = params['Data Files'] || 'Languages';
    const localesStr = params['Available Locales'] || 'vi,en';
    
    // Splits into an array, removes spaces, and adds file extensions
    const dataFiles = dataFilesStr.split(',').map(f => f.trim()).filter(f => f.length > 0).map(f => f + fileExtension);
    const availableLocales = localesStr.split(',').map(f => f.trim()).filter(f => f.length > 0);

    const showOnTitle = KB.Utils.isTrue(params['Show on Title']);
    const showInOptions = KB.Utils.isTrue(params['Show in Options']);
    const useNewGamePicker = KB.Utils.isTrue(params['New Game Picker']);

    // --- 1. CORE MANAGER ---
    class KB_LocalizationManager {
        constructor() {
            this._locale = params['Default Language'] || 'vi';
            this._data = {}; // Translation data
            this._cache = {}; // Cache for process(text) function
            this._availableLocales = availableLocales;
            // Initialize basic locales to prevent errors in getText
            this._availableLocales.forEach(locale => {
                if (!this._data[locale]) this._data[locale] = {};
            });
            this.loadData();
        }

        get locale() { return this._locale; }

        loadData() {
            // Iterate through all available locales to load files
            this._availableLocales.forEach(locale => {
                dataFiles.forEach(fileName => {
                    // Construct file path: data/[Data Root Folder]/[locale]/[fileName]
                    const url = `data/${dataRootFolder}/${locale}/${fileName}`;
                    if (dataType === 'CSV') {
                        this.loadCSV(url, locale);
                    } else if (dataType === 'JSON') {
                        this.loadJSON(url, locale);
                    }
                });
            });
        }

        loadJSON(url, locale) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = () => {
                if (xhr.status < 400) {
                    // Use safe KB.Utils.parseJSON
                    const jsonData = KB.Utils.parseJSON(xhr.responseText, null, `Localization JSON: ${url}`);
                    if (jsonData) {
                        this.mergeData(jsonData, locale);
                    }
                }
            };
            xhr.send();
        }

        loadCSV(url, locale) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => {
                if (xhr.status < 400) this.parseCSV(xhr.responseText, locale);
            };
            xhr.send();
        }
        
        // Merge new data into the correct locale
        mergeData(newLocaleData, locale) {
            if (!this._data[locale]) this._data[locale] = {};
            // Merge key-value of the new file into the current locale
            Object.assign(this._data[locale], newLocaleData);
            this._cache = {};
        }

        // Read CSV and merge into corresponding locales
        parseCSV(text, targetLocale) {
            const lines = text.trim().split(/\r?\n/);
            if (lines.length < 2) return;
            if (lines[0].charCodeAt(0) === 0xFEFF) lines[0] = lines[0].substr(1);

            const headers = this.parseCSVLine(lines[0]);
            
            // Find the index of the target language column (targetLocale)
            const targetIndex = headers.findIndex(h => h.trim() === targetLocale);
            let valueIndex;

            if (targetIndex !== -1) {
                // If the target language column is found in the header, use it
                valueIndex = targetIndex;
            } else if (headers.length >= 2) {
                // If not found, assume the file only has 2 columns: Key (0) and Value (1)
                valueIndex = 1;
            } else {
                return; // Too few columns, skip
            }
            
            if (!this._data[targetLocale]) this._data[targetLocale] = {};
            
            for (let i = 1; i < lines.length; i++) {
                const row = this.parseCSVLine(lines[i]);
                if (row.length < 2) continue;
                const key = row[0].trim();
                
                // Get value from the valueIndex column
                let val = row[valueIndex] || "";
                val = val.replace(/^"|"$/g, '').replace(/""/g, '"');
                this._data[targetLocale][key] = val;
                
            }
            this._cache = {};
        }


        parseCSVLine(text) {
            const res = [];
            let start = 0, inQ = false;
            for (let i = 0; i < text.length; i++) {
                if (text[i] === '"') inQ = !inQ;
                else if (text[i] === ',' && !inQ) {
                    res.push(text.substring(start, i));
                    start = i + 1;
                }
            }
            res.push(text.substring(start));
            return res;
        }

        setLanguage(locale) {
            if (this._data[locale]) {
                this._locale = locale;
                this._cache = {}; 
                ConfigManager.save();
                // Refresh UI when language changes
                if (SceneManager._scene) {
                    const wins = SceneManager._scene._windowLayer.children;
                    wins.forEach(w => {
                        if (typeof w.refresh === 'function') w.refresh();
                    });
                }
            }
        }

        cycleLanguage(reverse = false) {
            const keys = this._availableLocales; // Use list from config
            const valid = keys.filter(k => this._data[k] && typeof this._data[k] === 'object');
            if (valid.length > 0) {
                let idx = valid.indexOf(this._locale);
                if (reverse) {
                    idx = (idx - 1 + valid.length) % valid.length;
                } else {
                    idx = (idx + 1) % valid.length;
                }
                this.setLanguage(valid[idx]);
            }
        }

        getText(key) {
            const dict = this._data[this._locale];
            // Return value if found, otherwise return key
            return (dict && dict[key]) ? dict[key] : key;
        }

        process(text) {
            if (typeof text !== 'string') return text;
            if (text.indexOf('{') === -1) return text;
            if (this._cache[text]) return this._cache[text];
            
            // Replace all strings {key} with the translated value
            const result = text.replace(/\{(.*?)\}/g, (match, key) => {
                return this.getText(key.trim());
            });
            this._cache[text] = result;
            return result;
        }
    }

    // --- 2. INTEGRATION ---
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        if (text) text = KBLocalization.process(text);
        return _Window_Base_convertEscapeCharacters.call(this, text);
    };

    const _Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
        if (name) name = KBLocalization.process(name);
        _Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    // --- 3. OPTIONS MENU ---
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.locale = KBLocalization.locale;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        if (config.locale) KBLocalization.setLanguage(config.locale);
    };

    if (showInOptions) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            // Command name translated from {cmd_lang} will display in the left column
            this.addCommand('{cmd_lang}', 'locale');
        };
        
        // NOTE: Must save the original statusText function
        const _Window_Options_statusText = Window_Options.prototype.statusText;

        // Override statusText to only display the VALUE (Language Name)
        Window_Options.prototype.statusText = function(index) {
            if (this.commandSymbol(index) === 'locale') {
                const name = KBLocalization.getText('lang_name');
                // Display language name, or language code (uppercase) if name not found
                return name !== 'lang_name' ? name : KBLocalization.locale.toUpperCase();
            }
            // Call original function for other Options commands (Volume, etc.)
            return _Window_Options_statusText.call(this, index);
        };

        const _Window_Options_processOk = Window_Options.prototype.processOk;
        Window_Options.prototype.processOk = function() {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage();
                SoundManager.playOk();
                this.refresh();
                return;
            }
            _Window_Options_processOk.call(this);
        };
        
        const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
        Window_Options.prototype.cursorRight = function(wrap) {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage();
                SoundManager.playCursor();
                this.refresh();
                return;
            }
            _Window_Options_cursorRight.call(this, wrap);
        };
        
        const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
        Window_Options.prototype.cursorLeft = function(wrap) {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage(true); 
                SoundManager.playCursor();
                this.refresh();
                return;
            }
            _Window_Options_cursorLeft.call(this, wrap);
        };
    }

    // --- 4. LANGUAGE PICKER WINDOW (MODIFIED) ---
    class Window_KBPicker extends Window_Base {
        constructor(rect) {
            super(rect);
            this.opacity = 255;
            this.hide();
            this.deactivate();
            // Initialize Rectangle objects to store positions
            this._leftArrowRect = new Rectangle(0, 0, 0, 0);
            this._rightArrowRect = new Rectangle(0, 0, 0, 0);
            this._okButtonRect = new Rectangle(0, 0, 0, 0);
            this._okBitmap = null; 
            this._assetsLoading = false; // Flag to check loading status to prevent infinite loops
        }

        update() {
            super.update();
            if (this.active) {
                // Handle Input via keys (keyboard/gamepad)
                if (Input.isRepeated('right')) {
                    this.cycleLang(false);
                } else if (Input.isRepeated('left')) {
                    this.cycleLang(true);
                } else if (Input.isTriggered('ok')) {
                    SoundManager.playOk();
                    this.processOk();
                } else if (Input.isTriggered('cancel') || Input.isTriggered('escape')) {
                    SoundManager.playCancel();
                    this.processCancel();
                }
                this.processTouch(); // Handle touch/click
            }
        }
        
        cycleLang(reverse) {
            KBLocalization.cycleLanguage(reverse);
            SoundManager.playCursor();
            this.refresh();
        }
        
        // Fix: Replace canvasToLocalX with manual coordinate calculation
        processTouch() {
            if (TouchInput.isTriggered() || TouchInput.isRepeated()) {
                
                const globalX = TouchInput.x;
                const globalY = TouchInput.y;
                
                // Convert global coordinates (screen) to local coordinates (contents area)
                const x = globalX - this.x - this.padding; 
                const y = globalY - this.y - this.padding;
                
                // Check click/touch on left arrow
                if (this._leftArrowRect.contains(x, y)) {
                    this.cycleLang(true);
                }
                
                // Check click/touch on right arrow
                else if (this._rightArrowRect.contains(x, y)) {
                    this.cycleLang(false);
                }
                
                // Check click/touch on OK button
                else if (this._okButtonRect.contains(x, y)) {
                    SoundManager.playOk();
                    this.processOk();
                }
            }
        }

        refresh() {
            this.contents.clear();
            const width = this.contentsWidth();
            const lineHeight = this.lineHeight();

            // --- 1. Load Assets ---
            const locale = KBLocalization.locale;
            const flagBitmap = ImageManager.loadSystem("flag_" + locale);
            
            // Load OK button image (Assumed file name is Button_OK.png)
            if (!this._okBitmap) {
                this._okBitmap = ImageManager.loadSystem("Button_OK");
            }
            
            // Listener to ensure redrawing when image is finished loading
            const isFlagReady = flagBitmap.isReady();
            const isOkReady = this._okBitmap.isReady();

            // Fix: Only add listener if loading AND no listener is active
            if (!isFlagReady || !isOkReady) {
                if (!this._assetsLoading) { 
                    this._assetsLoading = true; // Mark that a listener has been added
                    
                    const callback = () => {
                        this._assetsLoading = false; // Reset flag after completion
                        if (this.visible) this.refresh();
                    };
                    
                    if (!isFlagReady) flagBitmap.addLoadListener(callback);
                    if (!isOkReady) this._okBitmap.addLoadListener(callback);
                }
            } else {
                this._assetsLoading = false;
            }

            // Draw Header
            let title = KBLocalization.getText('picker_title');
            if (title === 'picker_title') title = "---- Select Language ----";
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(title, 0, 0, width, 'center');
            this.resetTextColor();

            // --- 2. Draw Content (Flag + Name) ---
            const langName = KBLocalization.getText('lang_name');
            const arrowLeft = "◀ ";
            const arrowRight = " ▶";
            const okText = KBLocalization.getText('word_ok') !== 'word_ok' ? KBLocalization.getText('word_ok') : "OK";

            const nameWidth = this.textWidth(langName) + 10;
            const flagWidth = isFlagReady ? flagBitmap.width + 10 : 0;
            const arrowsWidth = this.textWidth(arrowLeft) + this.textWidth(arrowRight);
            const totalWidth = arrowsWidth + flagWidth + nameWidth;
            
            let startX = (width - totalWidth) / 2;
            const contentY = lineHeight * 1.5;
            const flagY = contentY + (lineHeight - (isFlagReady ? flagBitmap.height : lineHeight)) / 2;
            
            // Draw Left Arrow
            this.drawText(arrowLeft, startX, contentY, this.textWidth(arrowLeft), 'left');
            // Record left arrow position for Touch
            this._leftArrowRect.x = startX;
            this._leftArrowRect.y = contentY;
            this._leftArrowRect.width = this.textWidth(arrowLeft);
            this._leftArrowRect.height = lineHeight;
            startX += this.textWidth(arrowLeft);

            // Draw Flag
            if (isFlagReady) {
                this.contents.blt(flagBitmap, 0, 0, flagBitmap.width, flagBitmap.height, startX, flagY);
                startX += flagWidth;
            }

            // Draw Language Name
            this.drawText(langName, startX, contentY, nameWidth, 'center');
            startX += nameWidth;

            // Draw Right Arrow
            this.drawText(arrowRight, startX, contentY, this.textWidth(arrowRight), 'left');
            // Record right arrow position for Touch
            this._rightArrowRect.x = startX;
            this._rightArrowRect.y = contentY;
            this._rightArrowRect.width = this.textWidth(arrowRight);
            this._rightArrowRect.height = lineHeight;

            // --- 3. Draw CUSTOM OK Button (Using image) ---
            
            if (isOkReady) {
                const buttonBitmap = this._okBitmap;
                const buttonW = buttonBitmap.width;
                const buttonH = buttonBitmap.height;
                
                // Center button
                const okX = (width - buttonW) / 2;
                const okY = contentY + lineHeight * 2;
                
                // Draw button image
                this.contents.blt(buttonBitmap, 0, 0, buttonW, buttonH, okX, okY);
                
                // Draw OK text over the image (Use normal color for visibility)
                this.changeTextColor(ColorManager.normalColor()); 
                // Center OK text vertically to the button
                this.drawText(okText, okX, okY + (buttonH - lineHeight) / 2, buttonW, 'center'); 
                
                // Record OK button position for Touch
                this._okButtonRect.x = okX;
                this._okButtonRect.y = okY;
                this._okButtonRect.width = buttonW;
                this._okButtonRect.height = buttonH;
                
                this.resetTextColor(); 
            } else {
                // Placeholder position data and draw temporary rectangle if image hasn't loaded
                const buttonW = 180; 
                const buttonH = lineHeight * 1.5;
                const okX = (width - buttonW) / 2;
                const okY = contentY + lineHeight * 2;
                // Still draw temporarily so the OK button can be pressed even if the image hasn't loaded
                this.contents.fillRect(okX, okY, buttonW, buttonH, ColorManager.dimColor2());
                this.drawText(okText, okX, okY, buttonW, 'center');
                
                this._okButtonRect.x = okX;
                this._okButtonRect.y = okY;
                this._okButtonRect.width = buttonW;
                this._okButtonRect.height = buttonH;
            }
        }

        processOk() {
            if (this._okHandler) this._okHandler();
        }

        processCancel() {
            if (this._cancelHandler) this._cancelHandler();
        }

        setOkHandler(method) { this._okHandler = method; }
        setCancelHandler(method) { this._cancelHandler = method; }
        
        close() {
            this.hide();
        }
    }

    // --- Ensure Manager is initialized before any of its functions are called ---
    if (!window.KBLocalization) {
        window.KBLocalization = new KB_LocalizationManager();
    }
    
    // --- 5. SCENE TITLE INTEGRATION (KB_TitleCommands Sync) ---

    // ALIAS: Must run after KB_TitleCommands.js has created CommandWindow and Sprites
    const _Scene_Title_createCommandWindow_alias = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow_alias.call(this);

        // --- STORE REFERENCES FROM KB_TitleCommands ---
        // Sprites are stored in this._TpictureCom[]
        // Cursor is stored in this._cursor
        
        // Store Command reference
        if (this._TpictureCom) {
            this._comSprites = this._TpictureCom;
        }
        // Store Cursor reference
        if (this._cursor) {
            this._comCursor = this._cursor;
        }
    };
    
    // --- 6. COMMAND INTEGRATION ---

    if (showOnTitle) {
        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.call(this);
            const name = KBLocalization.getText('lang_name');
            const txt = (name !== 'lang_name') ? name : "Language";
            this.addCommand(txt, 'language');
        };
    }

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.createLanguagePicker();
    };

    Scene_Title.prototype.createLanguagePicker = function() {
        const rect = this.languagePickerRect();
        // Correct way to create Window_KBPicker to use the new rect
        this._langPicker = new Window_KBPicker(rect);
        this._langPicker.setOkHandler(this.onPickerOk.bind(this));
        this._langPicker.setCancelHandler(this.onPickerCancel.bind(this));
        this.addWindow(this._langPicker);
    };

    // Change Picker Language window size as requested (Larger)
    Scene_Title.prototype.languagePickerRect = function() {
        const w = 600; // New width
        const h = 200; // New height to contain the OK button
        const x = (Graphics.boxWidth - w) / 2;
        const y = (Graphics.boxHeight - h) / 2;
        return new Rectangle(x, y, w, h);
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        if (useNewGamePicker) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();

            // Hide Background and Title Sprite (Black screen)
            if (this._backSprite1) this._backSprite1.opacity = 0;
            if (this._backSprite2) this._backSprite2.opacity = 0;
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;

            // --- HIDE KB_TitleCommands CONTROLS (Command Sprites and Cursor) ---
            if (this._comSprites) {
                this._comSprites.forEach(s => s.visible = false);
            }
            if (this._comCursor) {
                this._comCursor.visible = false;
            }

            // Show Picker
            this._langPicker.refresh();
            this._langPicker.show();
            this._langPicker.activate();
            
        } else {
            _Scene_Title_commandNewGame.call(this);
        }
    };

    Scene_Title.prototype.onPickerOk = function() {
        // 1. Close Picker
        this._langPicker.hide();
        this._langPicker.deactivate();


        // 2. Proceed to New Game
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.onPickerCancel = function() {
        this._langPicker.hide();
        this._langPicker.deactivate();

        this._commandWindow.show();
        this._commandWindow.activate();

        // Restore Background and Title
        if (this._backSprite1) this._backSprite1.opacity = 255;
        if (this._backSprite2) this._backSprite2.opacity = 255;
        if (this._gameTitleSprite) this._gameTitleSprite.opacity = 255;
        
        // --- RESTORE KB_TitleCommands CONTROLS ---
        if (this._comSprites) {
            this._comSprites.forEach(s => s.visible = true);
        }
        if (this._comCursor) {
            this._comCursor.visible = true;
        }
    };

    const _Scene_Title_createCommandWindow_handler = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow_handler.call(this);
        this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    };

    Scene_Title.prototype.commandLanguage = function() {
        KBLocalization.cycleLanguage();
        SoundManager.playOk();
        this._commandWindow.refresh();
        this._commandWindow.activate(); 
    };

})();