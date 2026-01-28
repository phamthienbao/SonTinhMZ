/*:
 * @target MZ
 * @plugindesc [DEV TOOL V3.0] Trích xuất Map, Event & TOÀN BỘ DATABASE (Items, Skills, System...).
 * @author KB
 *
 * @command ExtractAndReplace
 * @text Bắt đầu Extract
 * @desc Chạy quy trình trích xuất và thay thế.
 *
 * @param dryRun
 * @text Chế độ Chạy Thử (Dry Run)
 * @type boolean
 * @default true
 * @desc TRUE: Chỉ xuất CSV (An toàn). FALSE: Ghi đè Key vào Database & Map (Nguy hiểm).
 *
 * @help
 * ============================================================================
 * KB DEV EXTRACTOR V3.0 - DATABASE SUPPORT
 * ============================================================================
 * Phiên bản này hỗ trợ trích xuất toàn bộ dữ liệu trong Database (F9).
 *
 * CÁC LOẠI DỮ LIỆU ĐƯỢC XỬ LÝ:
 * 1. Map Events & Common Events (Như V2.0)
 * 2. Items, Weapons, Armors (Tên & Mô tả)
 * 3. Skills, States (Tên, Mô tả, Thông báo)
 * 4. Classes, Enemies (Tên)
 * 5. System Terms (HP, MP, Level, Buy, Sell...)
 * 6. System Messages (Battle start, Escape, Victory...)
 *
 * ============================================================================
 * CẤU TRÚC KEY DATABASE
 * ============================================================================
 * - Item:      ITEM_{ID}_Name | ITEM_{ID}_Desc
 * - Weapon:    WEAP_{ID}_Name | WEAP_{ID}_Desc
 * - Armor:     ARMR_{ID}_Name | ARMR_{ID}_Desc
 * - Skill:     SKILL_{ID}_Name | SKILL_{ID}_Desc | SKILL_{ID}_Msg1
 * - State:     STATE_{ID}_Name | STATE_{ID}_Msg1 ...
 * - Enemy:     ENEMY_{ID}_Name
 * - Class:     CLASS_{ID}_Name
 * - System:    SYS_Basic_{Index} | SYS_Cmd_{Index} | SYS_Msg_{Type}
 *
 * ============================================================================
 * LƯU Ý QUAN TRỌNG
 * ============================================================================
 * Khi chạy chế độ Ghi đè (Real Write), tool sẽ thay đổi trực tiếp file:
 * System.json, Items.json, Skills.json...
 * -> BẮT BUỘC PHẢI BACKUP THƯ MỤC 'data' TRƯỚC KHI CHẠY.
 */

(() => {
    const pluginName = "KB_Dev_Extractor";
    let isDryRun = true;

    let fs = null;
    let path = null;
    
    if (Utils.isNwjs()) {
        fs = require('fs');
        path = require('path');
    }

    PluginManager.registerCommand(pluginName, "ExtractAndReplace", args => {
        if (!Utils.isNwjs()) {
            alert("Plugin này chỉ chạy trên PC (Playtest)!");
            return;
        }

        const params = PluginManager.parameters(pluginName);
        isDryRun = (params['dryRun'] === "true");

        const modeText = isDryRun ? "CHẠY THỬ (DRY RUN)" : "GHI ĐÈ THỰC TẾ (REAL WRITE)";
        const msg = `V3.0 - FULL DATABASE EXTRACT\nChế độ: ${modeText}.\n\n` +
                    (isDryRun ? "An toàn: Chỉ xuất CSV." : "CẢNH BÁO: Sẽ ghi đè Map, Items, Skills, System...");

        if (confirm(msg)) {
            KB_Extractor.startProcess(isDryRun);
        }
    });

    const KB_Extractor = {
        baseDir: Utils.isNwjs() ? path.dirname(process.mainModule.filename) : "",
        dataDir: Utils.isNwjs() ? path.join(path.dirname(process.mainModule.filename), 'data') : "",
        
        csvContent: "Key;vi\n", 
        
        startProcess(dryRun) {
            console.log(`=== BẮT ĐẦU EXTRACT V3.0 (${dryRun ? 'DRY RUN' : 'WRITE'}) ===`);
            
            // 1. Process Events
            this.processMaps(dryRun);
            this.processCommonEvents(dryRun);

            // 2. Process Database Objects
            this.processDatabaseFile('Items.json', 'ITEM', ['name', 'description'], dryRun);
            this.processDatabaseFile('Weapons.json', 'WEAP', ['name', 'description'], dryRun);
            this.processDatabaseFile('Armors.json', 'ARMR', ['name', 'description'], dryRun);
            this.processDatabaseFile('Skills.json', 'SKILL', ['name', 'description', 'message1', 'message2'], dryRun);
            this.processDatabaseFile('States.json', 'STATE', ['name', 'message1', 'message2', 'message3', 'message4'], dryRun);
            this.processDatabaseFile('Classes.json', 'CLASS', ['name'], dryRun);
            this.processDatabaseFile('Enemies.json', 'ENEMY', ['name'], dryRun);

            // 3. Process System (Phức tạp nhất)
            this.processSystem(dryRun);

            // Output
            const outputPath = path.join(this.baseDir, 'Exported_Text.csv');
            fs.writeFileSync(outputPath, '\uFEFF' + this.csvContent, 'utf8');
            
            const doneMsg = dryRun 
                ? "Đã xuất xong CSV (Dry Run).\nKiểm tra file 'Exported_Text.csv'." 
                : "HOÀN TẤT TOÀN BỘ!\nDatabase và Map đã được thay thế bằng Key.\nHãy Reload Project (F5).";
            
            alert(doneMsg);
            console.log("=== KẾT THÚC ===");
        },

        // --- XỬ LÝ DATABASE CHUNG (Items, Skills, etc.) ---
        processDatabaseFile(fileName, prefix, properties, dryRun) {
            const filePath = path.join(this.dataDir, fileName);
            if (!fs.existsSync(filePath)) return;

            console.log(`Processing ${fileName}...`);
            let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let isModified = false;

            // Data trong RPG Maker bắt đầu từ index 1 (index 0 là null)
            for (let i = 1; i < data.length; i++) {
                const item = data[i];
                if (!item) continue;

                properties.forEach(prop => {
                    if (item[prop] && item[prop].length > 0) {
                        // Tạo Key: VD: ITEM_001_Name
                        const suffix = prop.charAt(0).toUpperCase() + prop.slice(1).replace(/\d/g, ''); // name -> Name, message1 -> Message
                        // Custom suffix cho message
                        let keySuffix = suffix;
                        if (prop.includes('message')) keySuffix = 'Msg' + prop.replace('message', ''); // message1 -> Msg1
                        if (prop === 'description') keySuffix = 'Desc';

                        const key = `${prefix}_${this.pad(item.id)}_${keySuffix}`;
                        
                        // Nếu nội dung chưa phải là Key thì mới extract
                        if (!this.isKey(item[prop])) {
                            this.addToCSV(key, item[prop]);
                            item[prop] = key; // Thay thế trong data
                            isModified = true;
                        }
                    }
                });
            }

            if (!dryRun && isModified) {
                this.backupFile(filePath);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            }
        },

        // --- XỬ LÝ SYSTEM (Terms & Messages) ---
        processSystem(dryRun) {
            const fileName = 'System.json';
            const filePath = path.join(this.dataDir, fileName);
            if (!fs.existsSync(filePath)) return;

            console.log(`Processing ${fileName}...`);
            let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let isModified = false;

            // 1. Basic Terms (Level, HP, MP...)
            // data.terms.basic là mảng chuỗi
            if (data.terms && data.terms.basic) {
                data.terms.basic.forEach((text, index) => {
                    if (text && !this.isKey(text)) {
                        const key = `SYS_Basic_${index}`; // Cần mapping tay nếu muốn tên đẹp, ở đây dùng index cho gọn
                        this.addToCSV(key, text);
                        data.terms.basic[index] = key;
                        isModified = true;
                    }
                });
            }

            // 2. Command Terms (Fight, Escape, Buy, Sell...)
            if (data.terms && data.terms.commands) {
                data.terms.commands.forEach((text, index) => {
                    if (text && !this.isKey(text)) {
                        const key = `SYS_Cmd_${index}`;
                        this.addToCSV(key, text);
                        data.terms.commands[index] = key;
                        isModified = true;
                    }
                });
            }

            // 3. Param Terms (Mhp, Mmp, Atk...)
            if (data.terms && data.terms.params) {
                data.terms.params.forEach((text, index) => {
                    if (text && !this.isKey(text)) {
                        const key = `SYS_Param_${index}`;
                        this.addToCSV(key, text);
                        data.terms.params[index] = key;
                        isModified = true;
                    }
                });
            }

            // 4. Messages (Battle start, etc.)
            // data.terms.messages là Object
            if (data.terms && data.terms.messages) {
                Object.keys(data.terms.messages).forEach(prop => {
                    const text = data.terms.messages[prop];
                    if (text && !this.isKey(text)) {
                        const key = `SYS_Msg_${prop}`;
                        this.addToCSV(key, text);
                        data.terms.messages[prop] = key;
                        isModified = true;
                    }
                });
            }
            
            // 5. Game Title & Currency (Optional)
            if (data.currencyUnit && !this.isKey(data.currencyUnit)) {
                 const key = `SYS_Currency`;
                 this.addToCSV(key, data.currencyUnit);
                 data.currencyUnit = key;
                 isModified = true;
            }

            if (!dryRun && isModified) {
                this.backupFile(filePath);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            }
        },

        // --- CÁC HÀM CŨ (MAP & COMMON EVENTS) - GIỮ NGUYÊN ---
        processMaps(dryRun) {
            const mapInfosPath = path.join(this.dataDir, 'MapInfos.json');
            if (!fs.existsSync(mapInfosPath)) return;
            const mapInfos = JSON.parse(fs.readFileSync(mapInfosPath, 'utf8'));
            mapInfos.forEach(info => {
                if (info) {
                    const mapId = info.id;
                    const fileName = 'Map' + this.pad(mapId) + '.json';
                    const filePath = path.join(this.dataDir, fileName);
                    if (fs.existsSync(filePath)) {
                        let mapData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        let isModified = false;
                        mapData.events.forEach(event => {
                            if (event) {
                                event.pages.forEach((page, pageIndex) => {
                                    const prefix = `M${this.pad(mapId)}_E${this.pad(event.id)}_P${pageIndex + 1}`;
                                    if (this.processEventList(page.list, prefix)) isModified = true;
                                });
                            }
                        });
                        if (!dryRun && isModified) {
                            this.backupFile(filePath); 
                            fs.writeFileSync(filePath, JSON.stringify(mapData, null, 2));
                        }
                    }
                }
            });
        },

        processCommonEvents(dryRun) {
            const fileName = 'CommonEvents.json';
            const filePath = path.join(this.dataDir, fileName);
            if (fs.existsSync(filePath)) {
                let commonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                let isModified = false;
                commonData.forEach(event => {
                    if (event && event.list) {
                        const prefix = `C${this.pad(event.id)}`;
                        if (this.processEventList(event.list, prefix)) isModified = true;
                    }
                });
                if (!dryRun && isModified) {
                    this.backupFile(filePath);
                    fs.writeFileSync(filePath, JSON.stringify(commonData, null, 2));
                }
            }
        },

        processEventList(list, keyPrefix) {
            let modified = false;
            let i = 0;
            while (i < list.length) {
                const command = list[i];
                if (command.code === 401) {
                    let fullText = command.parameters[0];
                    let linesToRemove = 0;
                    let nextIndex = i + 1;
                    while (nextIndex < list.length && list[nextIndex].code === 401) {
                        fullText += "<br>" + list[nextIndex].parameters[0];
                        linesToRemove++;
                        nextIndex++;
                    }
                    if (!this.isKey(fullText) && (fullText.includes(" ") || fullText.length > 1 || !fullText.startsWith(keyPrefix.split('_')[0]))) {
                        const uniqueKey = `${keyPrefix}_L${i}`; 
                        this.addToCSV(uniqueKey, fullText);    
                        command.parameters[0] = uniqueKey;
                        if (linesToRemove > 0) list.splice(i + 1, linesToRemove);
                        modified = true;
                    }
                }
                i++;
            }
            return modified;
        },

        // --- UTILS ---
        isKey(text) {
            // Kiểm tra sơ bộ xem text có phải là Key không (để tránh replace nhiều lần)
            // Key thường ko có dấu cách, và chứa các từ khóa đặc thù
            if (!text || typeof text !== 'string') return false;
            return text.match(/^(ITEM_|WEAP_|ARMR_|SKILL_|STATE_|ENEMY_|CLASS_|SYS_|M\d+_E|C\d+_L)/);
        },

        backupFile(filePath) {
            const backupPath = filePath + ".bak";
            if (!fs.existsSync(backupPath)) fs.copyFileSync(filePath, backupPath);
        },

        addToCSV(key, text) {
            const safeText = text.replace(/"/g, '""');
            this.csvContent += `${key};"${safeText}"\n`;
        },
        
        pad(num) {
            return num.toString().padStart(3, '0');
        }
    };
})();