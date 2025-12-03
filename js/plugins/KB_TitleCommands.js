//============================================================================
// KB_TitleCommands.js
//============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.7 Fix) Title động + Fix lỗi (KB Edition).
 * @author KB (Modified from Moghunter by Gemini)
 *
 * @help
 * ===========================================================================
 * ## HƯỚNG DẪN KHẮC PHỤC LỖI "KHÔNG HIỆN ẢNH"
 * ===========================================================================
 * 1. Sau khi cài đặt plugin này, bạn hãy làm thao tác sau:
 * -> Đổi tên file này thành: KB_TitleCommands.js
 * -> Mở Plugin Manager (F10).
 * -> Nhấp đúp vào dòng KB_TitleCommands.
 * -> Bấm OK (để nó làm mới lại các thông số).
 * -> Lưu dự án (Ctrl + S).
 *
 * 2. Kiểm tra Console (F12):
 * -> Khi vào game, bấm F12, chọn tab Console.
 * -> Nếu thấy dòng: "KB MODE: IMAGE (ON)" là thành công.
 *
 * ===========================================================================
 * @param Use Image Buttons
 * @text Sử dụng nút ảnh?
 * @desc TRUE: Dùng ảnh động. FALSE: Dùng menu chữ mặc định.
 * @type boolean
 * @default true
 *
 * @param Animation Mode
 * @desc Loại hiệu ứng (Chỉ khi dùng ảnh).
 * 0 - None     1 - Pulse    2 - Shake
 * @default 1
 * @type select
 * @option None
 * @value 0
 * @option Pulse Effect
 * @value 1
 * @option Shake Effect
 * @value 2
 *
 * @param Left & Right Input
 * @desc Cho phép bấm trái phải?
 * @default true
 * @type boolean
 *
 * @param Slide X-Axis
 * @desc Tọa độ trượt X (Chỉ khi dùng ảnh).
 * @default -100
 *
 * @param Slide Y-Axis
 * @desc Tọa độ trượt Y (Chỉ khi dùng ảnh).
 * @default 0
 *
 * @param Cursor X-Axis
 * @desc Tọa độ Cursor X.
 * @default 0
 *
 * @param Cursor Y-Axis
 * @desc Tọa độ Cursor Y.
 * @default 5
 */

(() => {
    // Đã đổi tên Plugin ID để khớp với file KB_TitleCommands.js
    const pluginName = "KB_TitleCommands"; 
    const _Params = PluginManager.parameters(pluginName);
    
    // DEBUG: In ra trạng thái để kiểm tra
    const paramImage = String(_Params['Use Image Buttons']);
    
    // Đổi biến _mog thành _kb
    const _kb_useImages = (paramImage === "true");

    console.log("====================================");
    console.log("KB TITLE CHECK:");
    console.log("Raw Param: " + paramImage);
    console.log("Final Mode: " + (_kb_useImages ? "IMAGE (ON)" : "TEXT (OFF)"));
    console.log("====================================");

    const _kb_titcom_animMode = Number(_Params['Animation Mode'] || 1);
    const _kb_titcom_lrInput = String(_Params['Left & Right Input'] || "true") === "true";
    const _kb_titcom_slideX = Number(_Params['Slide X-Axis'] || -100);
    const _kb_titcom_slideY = Number(_Params['Slide Y-Axis'] || 0);
    const _kb_titcom_cursorX = Number(_Params['Cursor X-Axis'] || 0);
    const _kb_titcom_cursorY = Number(_Params['Cursor Y-Axis'] || 5);

    //=============================================================================
    // ** Window_TitleCommand
    //=============================================================================
    
    // Cách ẩn Window mạnh tay hơn: Set opacity ngay khi khởi tạo
    const _kb_titcom_win_initialize = Window_TitleCommand.prototype.initialize;
    Window_TitleCommand.prototype.initialize = function(rect) {
        _kb_titcom_win_initialize.call(this, rect);
        if (_kb_useImages) {
            this.visible = false;
            this.opacity = 0;
            this.contentsOpacity = 0;
            this._opening = false;
            this._closing = false;
        }
    };

    const _kb_titcom_win_update = Window_TitleCommand.prototype.update;
    Window_TitleCommand.prototype.update = function() {
        _kb_titcom_win_update.call(this);
        if (!_kb_useImages) return;
        
        // Cưỡng chế ẩn liên tục
        this.visible = false;
        this.opacity = 0;
        this.contentsOpacity = 0;
    };

    //=============================================================================
    // ** Scene_Title
    //=============================================================================

    const _kb_titcom_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _kb_titcom_createCommandWindow.call(this);
        if (_kb_useImages) {
            this.createTitleComSprites();
        }
    };

    Scene_Title.prototype.createTitleComSprites = function() {
        if (this._comSprites) {
            this._comSprites.forEach(sprite => this.removeChild(sprite));
        }
        if (this._comCursor) this.removeChild(this._comCursor);

        this._comSprites = [];
        this._comList = this._commandWindow._list;
        
        for (let i = 0; i < this._comList.length; i++) {
            this._comSprites[i] = new TpictureCom(i, this._comList[i]);
            this.addChild(this._comSprites[i]);
        }
        
        this._comCursor = new TpictureComCursor(this._comSprites);
        this.addChild(this._comCursor);
    };

    const _kb_titcom_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _kb_titcom_update.call(this);
        
        if (_kb_useImages) {
            if (this._comSprites) {
                for (let i = 0; i < this._comSprites.length; i++) {
                    this._comSprites[i].update(this._commandWindow._index);
                }
            }
            if (this._comCursor) {
                this._comCursor.update(this._commandWindow._index);
            }
            if (_kb_titcom_lrInput && this._commandWindow.active) {
                this.updateTitleComInput();
            }
        }
    };

    Scene_Title.prototype.updateTitleComInput = function() {
        if (Input.isRepeated('right')) {
            SoundManager.playCursor();
            this._commandWindow.cursorDown();
        } else if (Input.isRepeated('left')) {
            SoundManager.playCursor();
            this._commandWindow.cursorUp();
        }
    };

    // ======================================================================
    // INTEGRATION WITH SIMPLE LOCALIZATION
    // ======================================================================
    
    const _Scene_Title_commandLanguage = Scene_Title.prototype.commandLanguage;
    Scene_Title.prototype.commandLanguage = function() {
        if (_Scene_Title_commandLanguage) _Scene_Title_commandLanguage.call(this);

        if (_kb_useImages) {
            this.createTitleComSprites();
            if (this._comSprites) {
                this._comSprites.forEach(s => s.refreshAnimation());
            }
        }
    };

    //=============================================================================
    // ** TpictureCom & TpictureComCursor
    //=============================================================================
    
    function TpictureCom() { this.initialize.apply(this, arguments); }
    TpictureCom.prototype = Object.create(Sprite.prototype);
    TpictureCom.prototype.constructor = TpictureCom;

    TpictureCom.prototype.initialize = function(index, data) {
        Sprite.prototype.initialize.call(this);
        this._index = index;
        this._data = data;
        this._wait = 5 * index;
        this._aniData = { mode: _kb_titcom_animMode, zoom: 0, shakeD1: 0, shakeD2: 0, shakeX: 0 };
        this.createBitmap();
        this.refreshAnimation();
    };

    TpictureCom.prototype.refreshAnimation = function() {
        this.opacity = 0;
        this.x = _kb_titcom_slideX;
        this.y = _kb_titcom_slideY + (this._index * this.height);
    };

    TpictureCom.prototype.createBitmap = function() {
        let localePrefix = "";
        if (window.SimpleLocalization) {
            localePrefix = window.SimpleLocalization.locale + "_";
        }
        // Tên file: vi_Command_0
        const name = localePrefix + "Command_" + this._index;
        this.bitmap = ImageManager.loadTitle2(name);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    };

    TpictureCom.prototype.update = function(selIndex) {
        Sprite.prototype.update.call(this);
        if (this._wait > 0) { this._wait--; return; }
        if (this.opacity < 255) this.opacity += 5;
        
        const tX = Graphics.boxWidth / 2;
        const tY = (Graphics.boxHeight / 2) + (this._index * 40) + 20;

        if (this.x < tX) this.x += 5;
        if (this.x > tX) this.x -= 5;
        if (Math.abs(this.x - tX) < 5) this.x = tX;
        this.y = tY;

        this.updateSel(selIndex);
    };

    TpictureCom.prototype.updateSel = function(selIndex) {
        if (this._index === selIndex) {
            if (this._aniData.mode === 1) this.updateScalePulse();
            else if (this._aniData.mode === 2) this.updateShake();
            this.opacity = 255;
        } else {
            this.scale.x = 1.0;
            this.scale.y = 1.0;
            this.opacity = 160;
            this.x += this._aniData.shakeX;
        }
        this.x += this._aniData.shakeX;
    };

    TpictureCom.prototype.updateScalePulse = function() {
        if (!this._aniData.zoomDir) {
            this.scale.x += 0.01;
            this.scale.y += 0.01;
            if (this.scale.x > 1.10) this._aniData.zoomDir = true;
        } else {
            this.scale.x -= 0.01;
            this.scale.y -= 0.01;
            if (this.scale.x < 1.00) this._aniData.zoomDir = false;
        }
    };

    TpictureCom.prototype.updateShake = function() {
       this._aniData.shakeX = (Math.random() * 4) - 2;
    };

    function TpictureComCursor() { this.initialize.apply(this, arguments); }
    TpictureComCursor.prototype = Object.create(Sprite.prototype);
    TpictureComCursor.prototype.constructor = TpictureComCursor;

    TpictureComCursor.prototype.initialize = function(sprites) {
        Sprite.prototype.initialize.call(this);
        this._sprites = sprites;
        this.bitmap = ImageManager.loadTitle2("Cursor");
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.opacity = 0;
        this._animation = 0;
    };

    TpictureComCursor.prototype.update = function(selIndex) {
        Sprite.prototype.update.call(this);
        if (this._sprites && this._sprites[selIndex]) {
            const tS = this._sprites[selIndex];
            this.x = tS.x + _kb_titcom_cursorX;
            this.y = tS.y + _kb_titcom_cursorY;
            this.opacity = 255;
            this._animation++;
            if (this._animation < 20) this.x += 2;
            else if (this._animation < 40) this.x -= 2;
            else this._animation = 0;
        }
    };

})();