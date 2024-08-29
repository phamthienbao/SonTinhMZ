//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.30;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.30] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 * 
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 * 
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 * 
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 * 
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 * 
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 * 
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0xc67d6b=_0xb809;(function(_0x4e5507,_0x2b7ea3){const _0x3e9f82=_0xb809,_0x5c2436=_0x4e5507();while(!![]){try{const _0x3fd2b5=parseInt(_0x3e9f82(0x18b))/0x1*(-parseInt(_0x3e9f82(0x2ca))/0x2)+parseInt(_0x3e9f82(0x1e6))/0x3*(parseInt(_0x3e9f82(0x19b))/0x4)+parseInt(_0x3e9f82(0x2fb))/0x5+parseInt(_0x3e9f82(0x16d))/0x6+parseInt(_0x3e9f82(0x1cf))/0x7+-parseInt(_0x3e9f82(0x22d))/0x8*(-parseInt(_0x3e9f82(0xfb))/0x9)+-parseInt(_0x3e9f82(0x291))/0xa;if(_0x3fd2b5===_0x2b7ea3)break;else _0x5c2436['push'](_0x5c2436['shift']());}catch(_0x16b4ff){_0x5c2436['push'](_0x5c2436['shift']());}}}(_0x28f9,0x81d8b));var label=_0xc67d6b(0x307),tier=tier||0x0,dependencies=[_0xc67d6b(0x271)],pluginData=$plugins[_0xc67d6b(0x159)](function(_0x6422a6){const _0x3d252e=_0xc67d6b;return _0x6422a6[_0x3d252e(0x255)]&&_0x6422a6[_0x3d252e(0x10f)][_0x3d252e(0x167)]('['+label+']');})[0x0];function _0xb809(_0x4e4898,_0x55b02f){const _0x28f925=_0x28f9();return _0xb809=function(_0xb809b6,_0x1ce1c1){_0xb809b6=_0xb809b6-0xe5;let _0x51f8c3=_0x28f925[_0xb809b6];return _0x51f8c3;},_0xb809(_0x4e4898,_0x55b02f);}function _0x28f9(){const _0x1846f0=['setupAtbGaugeSprite','isEnemy','Skill-%1-%2','_letterSprite','fontSize','scale','applyItemUserEffect','updateTpb','IrxTp','EnemyBattlerFaceName','visualAtbGauge','anchor','create','loadSvEnemy','floor','mainSprite','InterruptFlashColor','IqGbY','Sprite_Battler_updateMain','showVisualAtbGauge','initialize','faceName','InterruptText','createStateIconSprite','atbAcceleration','createChildren','paramRate','RegExp','max','clearFieldAtbGraphics','%1BgColor1','parameters','_unit','ActorBattlerType','svBattlerName','createFieldGaugeContainerATB','Class-%1-%2','isHidden','applyBattleSystemATBUserEffect','Parse_Notetags_CreateJS','createBattlerContainer','createKeyJS','_windowskin','onDatabaseLoaded','enemy','2461998DjXKkl','andGt','fieldAtbGraphicIconIndex','Game_Battler_applyTpbPenalty','hTqNO','visible','updateLetter','atbCurrentValue','ParseAllNotetags','mnNoV','trim','IconSet','casting','vJbvZ','KzSGd','createBorderSprite','_atbFieldGaugeVisible','bind','fieldAtbGraphicType','_atbColors','After','Interrupt','cast2','9kZvPnd','BrIrx','aHiJn','hmBdb','prototype','round','Window_BattleStatus','makeDeepCopy','_tpbChargeTime','_battlerContainer','aVsmL','xlEEE','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','addCommand','VisuMZ_2_AggroControlSystem','slow%1','blt','InterruptAnimationID','BattleManager_endBattlerActions','right','JSON','Game_Battler_tpbRelativeSpeed','setAtbAfterSpeed','clearActions','Game_Battler_clearTpbChargeTime','_needsAtbClear','createBattlerSprites','_originalSpeed','note','targetOpacity','clearTpbChargeTime','fieldAtbGraphicFaceName','HDMMO','odxNq','ARRAYSTRUCT','#%1','isAppeared','Gauge','Game_Battler_tpbSpeed','Window_StatusBase_placeGauge','setFrame','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','nIYAJ','createFieldAtbGraphicFaceName','Game_Battler_onRestrict','MarkerSize','ARRAYEVAL','isCTB','Options','createGraphicSprite','addLoadListener','createFieldAtbGraphicFaceIndex','qlDHF','Fscmm','STR','qcqYC','updateGraphic','FieldGaugeClearEnemyGraphic','tpbSpeed','textColor','_skinSprite','_battler','currentMaxValue','changeAtbChargeTime','clearRect','updateVisibility','onAtbInterrupt','SlowRate','startEffect','vLwlP','gaugeBackColor','32FxhZMh','%1BorderColor','Sprite_Gauge_gaugeColor2','Actors','processBattleCoreJS','updateMain','stop','reduce','updateSelectionEffect','Enemies','children','FieldGauge','_scene','boxHeight','Sprite_Enemy_createStateIconSprite','isAtbCastingState','Scene_Options_maxCommands','VisibleGauge','_homeX','tpbChargeTime','initTpbChargeTime','_tpbTurnCount','initMembers','loadSvActor','applyGlobal','cast','AnchorX','State-%1-%2','UoGYD','cQXab','EnemyBattlerIcon','applyATBPenalty','FieldGaugeEnemyFace','subject','Game_Battler_initTpbChargeTime','setAtbCastTime','atbCurrentMaxValue','atbGaugeColor','RPvwq','battleMembers','status','getAtbCastTimeRate','slow','_graphicHue','endBattlerActions','_graphicSprite','changeIconGraphicBitmap','initTpbChargeTimeATB','updateOpacity','setItem','updatePositionOnGauge','JoUgP','addBattleSystemATBShowGaugeCommand','removeState','Sprite_Battler_setBattler','cast1','cast%1','_gaugeSprite','canMove','ceil','_horz','isSideView','SewaS','height','ARRAYNUM','fast','onRestrict','Game_Actor_clearActions','VisuMZ_1_BattleCore','_letter','uhvEK','members','DisplayPosition','PreStartTurnJS','updateBattleContainerOrder','ARRAYSTR','RKfYk','WoUCC','updatePositionOffset','iTlvq','Game_Battler_tpbAcceleration','isTpb','Charge','drawGaugeBitmap','oprZV','battler','setBattleSystemATBFieldGaugeVisible','_graphicEnemy','placeGauge','rLxTa','DRffd','Cnpsd','call','OTdQm','XpLFz','_helpWindow','MarkerOffset','isActor','FieldGaugeEnemyIcon','kcTEa','16831680ysbayD','updateAtbGaugeSpritePosition','fTdwr','(?:GAUGE|TIME|SPEED)','YKjgz','faceHeight','format','toLowerCase','tpbRequiredCastTime','sQNOK','min','%1BgColor2','atbActive','ColorManager_loadWindowskin','charging','SystemFieldGaugeVisibility','icon','width','fieldAtbGraphicFaceIndex','default%1','changeFaceGraphicBitmap','default','PMASZ','AddOption','currentValue','ShowMarkerBorder','Game_Battler_tpbBaseSpeed','Sprite_Gauge_currentValue','Color','_tpbCastTime','createBackgroundSprite','isBattleSystemATBFieldGaugeVisible','QNFrM','_statusType','nBwJz','fontFace','Scale','_homeY','aggroGauge','ktJhh','full%1','setHomeLocation','UEKYA','%1Side','isStateAffected','process_VisuMZ_BattleSystemATB_JS_Notetags','OffsetY','fast%1','fillRect','initBattleSystemATB','Armor-%1-%2','setupArrowSprite','EVAL','isATB','TnTae','lKCyA','QVodP','2dgLEFW','FieldGaugeActorFace','BorderThickness','processUpdateGraphic','clear','isShowAtbGauge','makeData','isActiveTpb','time','InitialGaugeJS','createFieldAtbGraphicType','boxWidth','addChildAt','tcgrC','_plural','TpbBaseSpeedCalcJS','createAtbGaugeSprite','TpbAccelerationJS','face','ARRAYJSON','return\x200','atbInterrupt','getChildIndex','_subject','snfOb','EnemyBattlerFaceIndex','changeSvActorGraphicBitmap','checkAggroControlSystemOffsetYAdjustment','Actor','gaugeColor2','NUnVk','gradientFillRect','filCN','_blendColor','_atbGaugeSprite','iconWidth','createFieldAtbGraphicIconIndex','ConfigManager_makeData','ready','HujVT','battleUIOffsetY','attackSpeed','GaugeDirection','setAtbChargeTime','Game_Battler_removeState','concat','_arrowSprite','createJS','ParseSkillNotetags','3168880FMQfrH','bottom','constructor','xJPaC','DisplayOffsetX','ShowStatusGauge','canMakeTpbActionsAtStartTpbTurn','ShowEnemyGauge','gzukb','NbKca','AnchorY','opacity','BattleSystemATB','revive','_fieldGaugeATB_Container','dJeCP','GaugeThick','Game_BattlerBase_appear','mainFontFace','battlerHue','%1SystemBorder','some','sort','ddXAp','applyData','Settings','Game_BattlerBase_revive','getColor','Scene_Boot_onDatabaseLoaded','iNKdD','tpbBaseSpeed','disappear','startTpbTurn','_tpbIdleTime','ParseItemNotetags','setAtbGraphicIconIndex','createFieldGaugeSkin','isAtbChargingState','faceWidth','die','67779AVVQwL','Game_Unit_updateTpb','makeTpbActions','TpbSpeedCalcJS','(?:ATB|TPB)','Game_Battler_startTpbCasting','createActorSprites','InterruptMirror','setHue','drawText','_fieldGaugeATB','actor','_fieldAtbGaugeFaceName','XtOtl','exit','_graphicIconIndex','updateGraphicHue','createStateSprite','atbStopped','MarkerArrowWindowSkin','description','_actions','changeAtbCastTime','createArrowSprite','createGaugeBitmap','loadEnemy','Cast','DisplayOffsetY','length','dNQNR','Item-%1-%2','MarkerSpeed','jOQpl','ActorBattlerIcon','Sprite_Gauge_currentMaxValue','setText','Window_Help_setItem','Enemy','svActorHorzCells','cGOIP','isAttack','_graphicFaceName','BattlerRelativeSpeedJS','name','DVZMU','GaugeLengthHorz','addChild','createGaugeSprite','zHaxO','LhGfS','sAoKr','FieldGaugeClearActorGraphic','addBattleSystemATBCommands','isSceneBattle','#000000','createAllWindows','tpbAcceleration','_onRestrictBypassAtbReset','InterruptTextColor','_fieldAtbGaugeFaceIndex','AdjustRect','ziwjD','_backgroundSprite','paramBuffRate','NUM','maxBattleMembers','_index','lgGNz','Jctmd','ConfigManager_applyData','createBattlerSprite','DfLya','setBattler','currentAction','JNbiW','Window_SideviewUiBattleStatus','_graphicType','item','_graphicSv','_tpbState','applyTpbPenalty','YSluv','_fieldAtbGaugeIconIndex','OffsetX','setup','map','UseFieldGauge','setupBattleSystemATBColors','EnemyBattlerType','InterruptFlashDuration','_fnord','FastRate','Sprite_Enemy_startEffect','targetPositionOnGauge','filter','setActionState','gaugeRate','UHJiO','parse','acting','lineHeight','svActorVertCells','kVHVe','BvLzW','Game_Action_applyItemUserEffect','createLetterSprite','skills','bitmap','includes','_atbAfterSpeed','update','Sprite_Battler_update','applyItemBattleSystemATBUserEffect','Actor-%1-%2','5522088oNpKip','battlerName','createFieldGaugeSpriteATB','clamp','changeEnemyGraphicBitmap','match','AFBgg','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','IconIndex','loadWindowskin','removeChild','_windowLayer','Window_Options_addGeneralOptions','ConvertParams','loadFace','isTpbCharged','atbSpeed','requestFauxAnimation','Name','maxCommands','undecided','Scene_Battle_createAllWindows','GaugeSystemSkin','updateAtbGaugeSpriteVisibility','EnemyBattlerFontFace','tpbRelativeSpeed','hasSvBattler','traitObjects','_graphicFaceIndex','BattleManager_isActiveTpb','116730PhfzFI','speed','HSJRt','Mechanics','iuuJP','svactor','Enemy-%1-%2','startTpbCasting','GaugeLengthVert','_svBattlerSprite','registerCommand','appear','isGaugeHorizontal','Game_System_initialize','atbColor','InterruptMute','527716gDNlCg','StunsResetGauge','RepositionTopForHelp','_fieldAtbGaugeGraphicType','BattleCore','toUpperCase','loadSystem'];_0x28f9=function(){return _0x1846f0;};return _0x28f9();}VisuMZ[label][_0xc67d6b(0xec)]=VisuMZ[label][_0xc67d6b(0xec)]||{},VisuMZ[_0xc67d6b(0x17a)]=function(_0x4b9c85,_0xa683a7){const _0x1ace04=_0xc67d6b;for(const _0xa932f9 in _0xa683a7){if(_0xa932f9[_0x1ace04(0x172)](/(.*):(.*)/i)){const _0xdd5557=String(RegExp['$1']),_0x268bab=String(RegExp['$2'])[_0x1ace04(0x1a0)]()[_0x1ace04(0x1d9)]();let _0xcbf121,_0x3555a9,_0x4d129a;switch(_0x268bab){case _0x1ace04(0x13b):_0xcbf121=_0xa683a7[_0xa932f9]!==''?Number(_0xa683a7[_0xa932f9]):0x0;break;case _0x1ace04(0x26d):_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x43ce65=>Number(_0x43ce65));break;case _0x1ace04(0x2c5):_0xcbf121=_0xa683a7[_0xa932f9]!==''?eval(_0xa683a7[_0xa932f9]):null;break;case _0x1ace04(0x214):_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x3f33df=>eval(_0x3f33df));break;case _0x1ace04(0x1fa):_0xcbf121=_0xa683a7[_0xa932f9]!==''?JSON['parse'](_0xa683a7[_0xa932f9]):'';break;case _0x1ace04(0x2dd):_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON['parse'](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x588576=>JSON[_0x1ace04(0x15d)](_0x588576));break;case'FUNC':_0xcbf121=_0xa683a7[_0xa932f9]!==''?new Function(JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9])):new Function(_0x1ace04(0x2de));break;case'ARRAYFUNC':_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON['parse'](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x1f1f1a=>new Function(JSON['parse'](_0x1f1f1a)));break;case _0x1ace04(0x21c):_0xcbf121=_0xa683a7[_0xa932f9]!==''?String(_0xa683a7[_0xa932f9]):'';break;case _0x1ace04(0x278):_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x204dd6=>String(_0x204dd6));break;case'STRUCT':_0x4d129a=_0xa683a7[_0xa932f9]!==''?JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9]):{},_0xcbf121=VisuMZ[_0x1ace04(0x17a)]({},_0x4d129a);break;case _0x1ace04(0x208):_0x3555a9=_0xa683a7[_0xa932f9]!==''?JSON[_0x1ace04(0x15d)](_0xa683a7[_0xa932f9]):[],_0xcbf121=_0x3555a9[_0x1ace04(0x150)](_0x5e6154=>VisuMZ[_0x1ace04(0x17a)]({},JSON[_0x1ace04(0x15d)](_0x5e6154)));break;default:continue;}_0x4b9c85[_0xdd5557]=_0xcbf121;}}return _0x4b9c85;},(_0x4f8db6=>{const _0x19f0f0=_0xc67d6b,_0x2a61cc=_0x4f8db6[_0x19f0f0(0x126)];for(const _0x4f7d2d of dependencies){if(_0x19f0f0(0x173)!==_0x19f0f0(0x173))return _0xf0ced3[_0x19f0f0(0x254)]()[this[_0x19f0f0(0x13d)]];else{if(!Imported[_0x4f7d2d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x19f0f0(0x297)](_0x2a61cc,_0x4f7d2d)),SceneManager[_0x19f0f0(0x109)]();break;}}}const _0x5a8aca=_0x4f8db6[_0x19f0f0(0x10f)];if(_0x5a8aca[_0x19f0f0(0x172)](/\[Version[ ](.*?)\]/i)){if(_0x19f0f0(0x303)===_0x19f0f0(0x281)){if(!_0x551889[_0x19f0f0(0xec)][_0x19f0f0(0x2aa)])return;const _0x3ce0e6=_0x1483c3[_0x19f0f0(0xec)],_0x29a3c5=this[_0x19f0f0(0x1c2)]===_0x3f3766?_0x19f0f0(0x2e6):'Enemy',_0x563d62=_0x19f0f0(0xe7)[_0x19f0f0(0x297)](_0x29a3c5),_0x15bc28=new _0x59f5e7();_0x15bc28[_0x19f0f0(0x1ad)]['x']=this[_0x19f0f0(0x1ad)]['x'],_0x15bc28[_0x19f0f0(0x1ad)]['y']=this['anchor']['y'];if(_0x3ce0e6[_0x563d62])_0x15bc28[_0x19f0f0(0x166)]=_0x359125['loadSystem'](_0x3ce0e6[_0x563d62]);else{let _0x5b5383=_0x3ce0e6[_0x19f0f0(0x213)],_0x21daeb=_0x3ce0e6[_0x19f0f0(0x2cc)];_0x15bc28[_0x19f0f0(0x166)]=new _0xfec1c3(_0x5b5383,_0x5b5383);const _0x41af85='#000000',_0x38a6d0=_0x26c327[_0x19f0f0(0xee)](_0x3ce0e6['%1BorderColor'[_0x19f0f0(0x297)](_0x29a3c5)]);_0x15bc28[_0x19f0f0(0x166)][_0x19f0f0(0x2c1)](0x0,0x0,_0x5b5383,_0x5b5383,_0x41af85),_0x5b5383-=0x2,_0x15bc28[_0x19f0f0(0x166)][_0x19f0f0(0x2c1)](0x1,0x1,_0x5b5383,_0x5b5383,_0x38a6d0),_0x5b5383-=_0x21daeb*0x2,_0x15bc28[_0x19f0f0(0x166)]['fillRect'](0x1+_0x21daeb,0x1+_0x21daeb,_0x5b5383,_0x5b5383,_0x41af85),_0x5b5383-=0x2,_0x21daeb+=0x1,_0x15bc28['bitmap'][_0x19f0f0(0x226)](0x1+_0x21daeb,0x1+_0x21daeb,_0x5b5383,_0x5b5383);}this[_0x19f0f0(0x139)]=_0x15bc28,this[_0x19f0f0(0x129)](this[_0x19f0f0(0x139)]);}else{const _0x38a278=Number(RegExp['$1']);_0x38a278!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x19f0f0(0x297)](_0x2a61cc,_0x38a278)),SceneManager[_0x19f0f0(0x109)]());}}if(_0x5a8aca[_0x19f0f0(0x172)](/\[Tier[ ](\d+)\]/i)){const _0x340063=Number(RegExp['$1']);if(_0x340063<tier){if(_0x19f0f0(0x145)===_0x19f0f0(0x145))alert(_0x19f0f0(0x20f)[_0x19f0f0(0x297)](_0x2a61cc,_0x340063,tier)),SceneManager[_0x19f0f0(0x109)]();else{const _0x529ef9=this[_0x19f0f0(0x106)]()[_0x19f0f0(0x202)];if(_0x529ef9[_0x19f0f0(0x172)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x19f0f0(0x2dc);else{if(_0x529ef9[_0x19f0f0(0x172)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x19f0f0(0x2a1);}return _0x1fa5ac[_0x19f0f0(0xec)][_0x19f0f0(0x1c3)];}}else{if('Fscmm'!==_0x19f0f0(0x21b))return _0x8dc79a[_0x19f0f0(0x2c6)]()?_0x3c42a9[_0x19f0f0(0x307)][_0x19f0f0(0xec)][_0x19f0f0(0x18e)][_0x19f0f0(0xfe)][_0x19f0f0(0x289)](this,this):_0x3e6e59['BattleSystemATB']['Game_Battler_tpbSpeed'][_0x19f0f0(0x289)](this);else tier=Math[_0x19f0f0(0x1be)](_0x340063,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x19f0f0(0xec)],_0x4f8db6[_0x19f0f0(0x1c1)]);})(pluginData),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],'FieldGaugeActorIcon',_0x23e91e=>{const _0x5d0b82=_0xc67d6b;VisuMZ[_0x5d0b82(0x17a)](_0x23e91e,_0x23e91e);const _0x1b7bee=_0x23e91e[_0x5d0b82(0x230)],_0x5087d4=_0x23e91e[_0x5d0b82(0x175)];for(const _0x3a73bf of _0x1b7bee){if(_0x5d0b82(0x290)===_0x5d0b82(0x290)){const _0x19dae3=$gameActors['actor'](_0x3a73bf);if(!_0x19dae3)continue;_0x19dae3[_0x5d0b82(0x19e)]='icon',_0x19dae3[_0x5d0b82(0x14d)]=_0x5087d4;}else this['addBattleSystemATBShowGaugeCommand']();}}),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],_0xc67d6b(0x2cb),_0x579854=>{const _0x59d107=_0xc67d6b;VisuMZ[_0x59d107(0x17a)](_0x579854,_0x579854);const _0x51ad5e=_0x579854[_0x59d107(0x230)],_0x207f44=_0x579854['FaceName'],_0x219cb6=_0x579854['FaceIndex'];for(const _0x2d5a2e of _0x51ad5e){const _0x46998b=$gameActors[_0x59d107(0x106)](_0x2d5a2e);if(!_0x46998b)continue;_0x46998b[_0x59d107(0x19e)]='face',_0x46998b[_0x59d107(0x107)]=_0x207f44,_0x46998b[_0x59d107(0x136)]=_0x219cb6;}}),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],_0xc67d6b(0x12e),_0x37cdc7=>{const _0x390855=_0xc67d6b;VisuMZ[_0x390855(0x17a)](_0x37cdc7,_0x37cdc7);const _0x28a11d=_0x37cdc7[_0x390855(0x230)];for(const _0x2f7ee4 of _0x28a11d){const _0x3331a4=$gameActors[_0x390855(0x106)](_0x2f7ee4);if(!_0x3331a4)continue;_0x3331a4[_0x390855(0x1bf)]();}}),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],_0xc67d6b(0x28f),_0x49812e=>{const _0x41a1f6=_0xc67d6b;VisuMZ[_0x41a1f6(0x17a)](_0x49812e,_0x49812e);const _0x5c58f2=_0x49812e[_0x41a1f6(0x236)],_0xf71127=_0x49812e[_0x41a1f6(0x175)];for(const _0x20001c of _0x5c58f2){if(_0x41a1f6(0x279)===_0x41a1f6(0x279)){const _0x138cf0=$gameTroop['members']()[_0x20001c];if(!_0x138cf0)continue;_0x138cf0[_0x41a1f6(0x19e)]='icon',_0x138cf0[_0x41a1f6(0x14d)]=_0xf71127;}else{const _0x2a50ea=this['battler']();if(!_0x2a50ea)return;if(!_0x2a50ea[_0x41a1f6(0x1a3)]())return;if(this[_0x41a1f6(0x258)]===_0x2a50ea[_0x41a1f6(0xe6)]())return;this['_graphicHue']=_0x2a50ea[_0x41a1f6(0xe6)](),this['_graphicSprite']['setHue'](_0x2a50ea[_0x41a1f6(0x187)]()?0x0:this['_graphicHue']);}}}),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],_0xc67d6b(0x24d),_0x335788=>{const _0x320272=_0xc67d6b;VisuMZ[_0x320272(0x17a)](_0x335788,_0x335788);const _0x2ac0bc=_0x335788[_0x320272(0x236)],_0x34a69f=_0x335788['FaceName'],_0x2c0e58=_0x335788['FaceIndex'];for(const _0x1fe17d of _0x2ac0bc){const _0x285aca=$gameTroop['members']()[_0x1fe17d];if(!_0x285aca)continue;_0x285aca['_fieldAtbGaugeGraphicType']=_0x320272(0x2dc),_0x285aca['_fieldAtbGaugeFaceName']=_0x34a69f,_0x285aca[_0x320272(0x136)]=_0x2c0e58;}}),PluginManager[_0xc67d6b(0x195)](pluginData['name'],_0xc67d6b(0x21f),_0x6ca9c=>{const _0x39f494=_0xc67d6b;VisuMZ[_0x39f494(0x17a)](_0x6ca9c,_0x6ca9c);const _0x440951=_0x6ca9c[_0x39f494(0x236)];for(const _0x4cc9ef of _0x440951){const _0x5c6cbd=$gameTroop[_0x39f494(0x274)]()[_0x4cc9ef];if(!_0x5c6cbd)continue;_0x5c6cbd[_0x39f494(0x1bf)]();}}),PluginManager[_0xc67d6b(0x195)](pluginData[_0xc67d6b(0x126)],_0xc67d6b(0x2a0),_0x46ee62=>{const _0x504573=_0xc67d6b;VisuMZ[_0x504573(0x17a)](_0x46ee62,_0x46ee62);const _0x34b6fa=_0x46ee62['Visible'];$gameSystem[_0x504573(0x283)](_0x34b6fa);}),VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0xef)]=Scene_Boot[_0xc67d6b(0x1ea)]['onDatabaseLoaded'],Scene_Boot[_0xc67d6b(0x1ea)][_0xc67d6b(0x1cd)]=function(){const _0x49b913=_0xc67d6b;this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),VisuMZ[_0x49b913(0x307)]['Scene_Boot_onDatabaseLoaded'][_0x49b913(0x289)](this),this[_0x49b913(0x2be)]();},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1bd)]={},Scene_Boot[_0xc67d6b(0x1ea)]['process_VisuMZ_BattleSystemATB_CreateRegExp']=function(){const _0x32c637=_0xc67d6b,_0x32f3b2=VisuMZ[_0x32c637(0x19f)][_0x32c637(0x1bd)],_0x718819=_0x32c637(0x1f2),_0x28ef2d=[_0x32c637(0x27f),'Cast','After'];for(const _0x2a1498 of _0x28ef2d){const _0x3d7b11=_0x718819[_0x32c637(0x297)](_0x2a1498[_0x32c637(0x1a0)]()[_0x32c637(0x1d9)](),_0x32c637(0xff),_0x32c637(0x294)),_0x2861f6=new RegExp(_0x3d7b11,'i');VisuMZ[_0x32c637(0x307)][_0x32c637(0x1bd)][_0x2a1498]=_0x2861f6;}},Scene_Boot['prototype'][_0xc67d6b(0x2be)]=function(){const _0x18f488=_0xc67d6b;if(VisuMZ[_0x18f488(0x1d7)])return;const _0x5c57c7=$dataSkills['concat']($dataItems);for(const _0x3b4d33 of _0x5c57c7){if(!_0x3b4d33)continue;VisuMZ[_0x18f488(0x307)][_0x18f488(0x1c9)](_0x3b4d33);}},VisuMZ[_0xc67d6b(0x307)]['ParseSkillNotetags']=VisuMZ[_0xc67d6b(0x2fa)],VisuMZ[_0xc67d6b(0x2fa)]=function(_0x403d87){const _0x162609=_0xc67d6b;VisuMZ[_0x162609(0x307)][_0x162609(0x2fa)][_0x162609(0x289)](this,_0x403d87),VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x403d87);},VisuMZ[_0xc67d6b(0x307)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0xc67d6b(0xf5)]=function(_0xe425b2){const _0x399998=_0xc67d6b;VisuMZ[_0x399998(0x307)][_0x399998(0xf5)][_0x399998(0x289)](this,_0xe425b2),VisuMZ[_0x399998(0x307)][_0x399998(0x1c9)](_0xe425b2);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1c9)]=function(_0x533300){const _0x1a142a=_0xc67d6b,_0x4b9cf4=[_0x1a142a(0x27f),'Cast',_0x1a142a(0x1e3)];for(const _0x4b6b15 of _0x4b9cf4){_0x1a142a(0x161)!==_0x1a142a(0x161)?(this[_0x1a142a(0x27e)]()&&!_0x4c32c2[_0x1a142a(0x267)]()&&(_0x263f47[_0x1a142a(0x134)]=!![]),_0x1aa4ef[_0x1a142a(0x307)]['BattleManager_endBattlerActions'][_0x1a142a(0x289)](this,_0x57e00a),_0x53354d['isEnemy']()&&this[_0x1a142a(0x27e)]()&&!_0x3865d8['canMove']()&&(_0x4bc45e[_0x1a142a(0x134)]=![])):VisuMZ[_0x1a142a(0x307)][_0x1a142a(0x2f9)](_0x533300,_0x4b6b15);}},VisuMZ['BattleSystemATB']['JS']={},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x2f9)]=function(_0x51c8c6,_0x28256b){const _0x37c897=_0xc67d6b,_0x388d8d=_0x51c8c6[_0x37c897(0x202)];if(_0x388d8d[_0x37c897(0x172)](VisuMZ[_0x37c897(0x307)][_0x37c897(0x1bd)][_0x28256b])){const _0x142664=String(RegExp['$1']),_0x10cfe8='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x37c897(0x297)](_0x142664,_0x28256b),_0x5b6420=VisuMZ[_0x37c897(0x307)][_0x37c897(0x1cb)](_0x51c8c6,_0x28256b);VisuMZ[_0x37c897(0x307)]['JS'][_0x5b6420]=new Function(_0x10cfe8);}},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1cb)]=function(_0x5c8aa9,_0x4c8059){const _0x2eb493=_0xc67d6b;if(VisuMZ[_0x2eb493(0x1cb)])return VisuMZ[_0x2eb493(0x1cb)](_0x5c8aa9,_0x4c8059);let _0x4c5b30='';if($dataActors[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x16c)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataClasses[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x1c6)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataSkills[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30='Skill-%1-%2'[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataItems[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x119)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataWeapons[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30='Weapon-%1-%2'[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataArmors[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x2c3)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataEnemies[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x191)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);if($dataStates[_0x2eb493(0x167)](_0x5c8aa9))_0x4c5b30=_0x2eb493(0x248)[_0x2eb493(0x297)](_0x5c8aa9['id'],_0x4c8059);return _0x4c5b30;},ConfigManager[_0xc67d6b(0x1ac)]=!![],VisuMZ['BattleSystemATB'][_0xc67d6b(0x2ef)]=ConfigManager[_0xc67d6b(0x2d0)],ConfigManager[_0xc67d6b(0x2d0)]=function(){const _0x295d2a=_0xc67d6b,_0x26c748=VisuMZ[_0x295d2a(0x307)]['ConfigManager_makeData']['call'](this);return _0x26c748[_0x295d2a(0x1ac)]=this[_0x295d2a(0x1ac)],_0x26c748;},VisuMZ[_0xc67d6b(0x307)]['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0xc67d6b(0xeb)]=function(_0x4558e3){const _0x2796d5=_0xc67d6b;VisuMZ['BattleSystemATB'][_0x2796d5(0x140)][_0x2796d5(0x289)](this,_0x4558e3),'visualAtbGauge'in _0x4558e3?this['visualAtbGauge']=_0x4558e3[_0x2796d5(0x1ac)]:this[_0x2796d5(0x1ac)]=!![];},ImageManager[_0xc67d6b(0x121)]=ImageManager[_0xc67d6b(0x121)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0xc67d6b(0x160)]||0x6,TextManager['visualAtbGauge']=VisuMZ['BattleSystemATB'][_0xc67d6b(0xec)][_0xc67d6b(0x216)][_0xc67d6b(0x17f)],VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x29e)]=ColorManager['loadWindowskin'],ColorManager[_0xc67d6b(0x176)]=function(){const _0x14530c=_0xc67d6b;VisuMZ[_0x14530c(0x307)][_0x14530c(0x29e)][_0x14530c(0x289)](this),this[_0x14530c(0x1cc)][_0x14530c(0x218)](this[_0x14530c(0x152)]['bind'](this));},ColorManager[_0xc67d6b(0xee)]=function(_0x2a1c3b){const _0x4ab829=_0xc67d6b;return _0x2a1c3b=String(_0x2a1c3b),_0x2a1c3b[_0x4ab829(0x172)](/#(.*)/i)?_0x4ab829(0x1dd)===_0x4ab829(0x122)?_0x50978e[_0x4ab829(0x2c6)]()?_0xcac7[_0x4ab829(0x307)]['Settings']['Mechanics']['BattlerRelativeSpeedJS'][_0x4ab829(0x289)](this,this):_0xa05ab4['BattleSystemATB']['Game_Battler_tpbRelativeSpeed'][_0x4ab829(0x289)](this):_0x4ab829(0x209)['format'](String(RegExp['$1'])):this[_0x4ab829(0x221)](Number(_0x2a1c3b));},ColorManager[_0xc67d6b(0x152)]=function(){const _0x920fdd=_0xc67d6b,_0x8dda93=[_0x920fdd(0x2a6),'full',_0x920fdd(0x246),_0x920fdd(0x26e),_0x920fdd(0x257),_0x920fdd(0x233)],_0x1fb7b2=VisuMZ[_0x920fdd(0x307)]['Settings'][_0x920fdd(0x2ad)];this['_atbColors']={};for(const _0x58f2f1 of _0x8dda93){if(_0x920fdd(0x207)!=='KnOxy')for(let _0x481b08=0x1;_0x481b08<=0x2;_0x481b08++){const _0x130962=_0x58f2f1+_0x481b08;this[_0x920fdd(0x1e2)][_0x130962]=this['getColor'](_0x1fb7b2[_0x130962]);}else{if(!this[_0x920fdd(0x223)])return _0x3e22a0[_0x920fdd(0x199)](_0x920fdd(0x2a4)[_0x920fdd(0x297)](_0x4fdf6d));if(this['_battler'][_0x920fdd(0x10d)]())return _0x31ea81[_0x920fdd(0x199)]('stop%1'['format'](_0x5f212c));if(this[_0x920fdd(0x223)][_0x920fdd(0x23c)]())return _0x3a5c4d['atbColor'](_0x920fdd(0x265)[_0x920fdd(0x297)](_0x30f8d7));if(this[_0x920fdd(0x15b)]()>=0x1)return _0x42b15d[_0x920fdd(0x199)]('full%1'[_0x920fdd(0x297)](_0x4b6b34));const _0x17a34f=_0x58aa0b['BattleSystemATB'][_0x920fdd(0xec)]['Gauge'],_0x52308b=this[_0x920fdd(0x223)][_0x920fdd(0x1bc)](0x6)*this[_0x920fdd(0x223)][_0x920fdd(0x13a)](0x6);if(_0x52308b<=_0x17a34f[_0x920fdd(0x229)])return _0x27a408['atbColor']('slow%1'['format'](_0x421321));if(_0x52308b>=_0x17a34f[_0x920fdd(0x156)])return _0x2ddd70['atbColor'](_0x920fdd(0x2c0)[_0x920fdd(0x297)](_0x567ee6));return _0x45ae92[_0x920fdd(0x199)](_0x920fdd(0x2a4)['format'](_0x29fc45));}}},ColorManager[_0xc67d6b(0x199)]=function(_0x1d90e8){const _0x5f576e=_0xc67d6b;if(this[_0x5f576e(0x1e2)]===undefined)this[_0x5f576e(0x152)]();return this['_atbColors'][_0x1d90e8]||_0x5f576e(0x131);},SceneManager[_0xc67d6b(0x130)]=function(){const _0x37a3a6=_0xc67d6b;return this[_0x37a3a6(0x239)]&&this[_0x37a3a6(0x239)][_0x37a3a6(0x2fd)]===Scene_Battle;},BattleManager[_0xc67d6b(0x2c6)]=function(){const _0x27ea2c=_0xc67d6b;if(Imported['VisuMZ_2_BattleSystemCTB']&&this[_0x27ea2c(0x215)]())return![];return this['isTpb']();},VisuMZ[_0xc67d6b(0x307)]['BattleManager_isActiveTpb']=BattleManager[_0xc67d6b(0x2d1)],BattleManager[_0xc67d6b(0x2d1)]=function(){const _0x4ed839=_0xc67d6b;if(!this[_0x4ed839(0x27e)]()){if('sQNOK'===_0x4ed839(0x29a))return![];else{const _0x238395=_0x39ba45[_0x4ed839(0x1f7)],_0x51d49e=_0x56ee39[_0x4ed839(0x102)],_0x254073=_0x51fd04[_0x4ed839(0x19a)];_0x316e88[_0x4ed839(0x17e)]([this],_0x238395,_0x51d49e,_0x254073);}}else{if(ConfigManager&&ConfigManager['atbActive']!==undefined){if('qoLrq'!=='IFnuG')return ConfigManager[_0x4ed839(0x29d)];else _0x5656ca[_0x4ed839(0x134)]=!![];}else return VisuMZ[_0x4ed839(0x307)][_0x4ed839(0x18a)][_0x4ed839(0x289)](this);}},VisuMZ[_0xc67d6b(0x307)]['Game_System_initialize']=Game_System['prototype']['initialize'],Game_System[_0xc67d6b(0x1ea)][_0xc67d6b(0x1b6)]=function(){const _0x1bb90c=_0xc67d6b;VisuMZ['BattleSystemATB'][_0x1bb90c(0x198)][_0x1bb90c(0x289)](this),this[_0x1bb90c(0x2c2)]();},Game_System[_0xc67d6b(0x1ea)][_0xc67d6b(0x2c2)]=function(){const _0x361bc5=_0xc67d6b;this[_0x361bc5(0x1df)]=!![];},Game_System[_0xc67d6b(0x1ea)]['isBattleSystemATBFieldGaugeVisible']=function(){const _0x248ebe=_0xc67d6b;return this[_0x248ebe(0x1df)]===undefined&&(_0x248ebe(0x273)===_0x248ebe(0x273)?this[_0x248ebe(0x2c2)]():_0xa9aba7='face'),this[_0x248ebe(0x1df)];},Game_System[_0xc67d6b(0x1ea)][_0xc67d6b(0x283)]=function(_0x2785fd){const _0x10ebc2=_0xc67d6b;this[_0x10ebc2(0x1df)]===undefined&&(_0x10ebc2(0x1e8)!==_0x10ebc2(0x1e8)?(this[_0x10ebc2(0x1ad)]['x']=0.5,this[_0x10ebc2(0x1ad)]['y']=0.5):this[_0x10ebc2(0x2c2)]()),this[_0x10ebc2(0x1df)]=_0x2785fd;},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x163)]=Game_Action[_0xc67d6b(0x1ea)][_0xc67d6b(0x1a8)],Game_Action[_0xc67d6b(0x1ea)]['applyItemUserEffect']=function(_0x2b8f97){const _0x462547=_0xc67d6b;VisuMZ[_0x462547(0x307)][_0x462547(0x163)]['call'](this,_0x2b8f97),this[_0x462547(0x1c8)](_0x2b8f97);},Game_Action[_0xc67d6b(0x1ea)][_0xc67d6b(0x1c8)]=function(_0x3e01af){const _0x6553f3=_0xc67d6b;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x6553f3(0x2c6)]())return;if(this[_0x6553f3(0x148)]())this[_0x6553f3(0x16b)](_0x3e01af);},Game_Action[_0xc67d6b(0x1ea)][_0xc67d6b(0x16b)]=function(_0xbbc456){const _0x33e2dc=_0xc67d6b,_0x39c964=this[_0x33e2dc(0x148)]()[_0x33e2dc(0x202)];if(_0xbbc456[_0x33e2dc(0xf8)]()){if('IiaZF'!=='IiaZF')this[_0x33e2dc(0x306)]=_0xfa45c0[_0x33e2dc(0x1be)](_0xbb88b,this['opacity']-_0x1b2b76);else{const _0x3860b3=VisuMZ[_0x33e2dc(0x307)][_0x33e2dc(0x1cb)](this[_0x33e2dc(0x148)](),_0x33e2dc(0x27f));if(VisuMZ[_0x33e2dc(0x307)]['JS'][_0x3860b3]){const _0x5b2dff=VisuMZ[_0x33e2dc(0x307)]['JS'][_0x3860b3][_0x33e2dc(0x289)](this,this[_0x33e2dc(0x24e)](),_0xbbc456);_0xbbc456[_0x33e2dc(0x2f5)](_0x5b2dff);}_0x39c964['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0xbbc456['setAtbChargeTime'](Number(RegExp['$1'])*0.01),_0x39c964[_0x33e2dc(0x172)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0xbbc456[_0x33e2dc(0x225)](Number(RegExp['$1'])*0.01);}}else{if(_0xbbc456['isAtbCastingState']()){if(_0x33e2dc(0x18f)!==_0x33e2dc(0x18f))_0x3dfd53=_0x59e54c[_0x33e2dc(0x1be)](_0x54ff1e,_0x10507f);else{const _0x3fbdc7=VisuMZ['BattleSystemATB'][_0x33e2dc(0x1cb)](this[_0x33e2dc(0x148)](),_0x33e2dc(0x115));if(VisuMZ[_0x33e2dc(0x307)]['JS'][_0x3fbdc7]){const _0x12e4e7=VisuMZ[_0x33e2dc(0x307)]['JS'][_0x3fbdc7]['call'](this,this[_0x33e2dc(0x24e)](),_0xbbc456);_0xbbc456[_0x33e2dc(0x250)](_0x12e4e7);}if(_0x39c964['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if('UEKYA'===_0x33e2dc(0x2bb))_0xbbc456[_0x33e2dc(0x250)](Number(RegExp['$1'])*0.01);else{if(!_0x34605a[_0x33e2dc(0x2c6)]())return;if(!_0x16313d[_0x33e2dc(0xec)][_0x33e2dc(0x151)])return;if(!_0x12d61a[_0x33e2dc(0x1ac)])return;this[_0x33e2dc(0x105)]=new _0x19c799(),this[_0x33e2dc(0x309)]['addChild'](this[_0x33e2dc(0x105)]);}}_0x39c964[_0x33e2dc(0x172)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0xbbc456[_0x33e2dc(0x111)](Number(RegExp['$1'])*0.01),_0x39c964['match'](/<(?:ATB|TPB) INTERRUPT>/i)&&_0xbbc456[_0x33e2dc(0x2df)]();}}}},VisuMZ[_0xc67d6b(0x307)]['Game_Action_applyGlobal']=Game_Action[_0xc67d6b(0x1ea)][_0xc67d6b(0x245)],Game_Action[_0xc67d6b(0x1ea)][_0xc67d6b(0x245)]=function(){const _0x47c43e=_0xc67d6b;VisuMZ[_0x47c43e(0x307)]['Game_Action_applyGlobal']['call'](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0xc67d6b(0x1ea)]['applyGlobalBattleSystemATBEffects']=function(){const _0x134127=_0xc67d6b;if(!this[_0x134127(0x148)]())return;if(!BattleManager[_0x134127(0x2c6)]())return;const _0x37a5db=this[_0x134127(0x148)]()[_0x134127(0x202)];let _0x15dff3=0x0;this['_forcing']&&(_0x134127(0x118)!==_0x134127(0x118)?(_0x35e812=_0x43d8e1-0x1,_0x16d98e=_0x56c668-0x3-_0x40240b,_0x4d358[_0x134127(0x2e9)](0x1,0x2+_0x5e9254,_0x5358ca-0x2,_0x2631f0,_0x430a57,_0x1e92c5,!![]),_0x3ff3cd['gradientFillRect'](0x1,0x1,_0x566557-0x2,_0x8df4b2,_0x35c01f,_0x43d8a1,!![])):_0x15dff3=this[_0x134127(0x24e)]()['_tpbChargeTime']);const _0x512ae5=VisuMZ[_0x134127(0x307)][_0x134127(0x1cb)](this[_0x134127(0x148)](),_0x134127(0x1e3));VisuMZ[_0x134127(0x307)]['JS'][_0x512ae5]&&(_0x15dff3=VisuMZ[_0x134127(0x307)]['JS'][_0x512ae5][_0x134127(0x289)](this,this[_0x134127(0x24e)](),this[_0x134127(0x24e)]()));let _0x339870=this[_0x134127(0x148)]()[_0x134127(0x18c)]>0x0?this[_0x134127(0x148)]()['speed']:0x0;if(this[_0x134127(0x123)]())_0x339870+=this[_0x134127(0x24e)]()[_0x134127(0x2f3)]();_0x15dff3+=(_0x339870/0xfa0)[_0x134127(0x170)](0x0,0x1);this[_0x134127(0x148)]()[_0x134127(0x202)][_0x134127(0x172)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x15dff3=Number(RegExp['$1'])*0.01);const _0xa49282=this['subject']()[_0x134127(0x188)]()[_0x134127(0x2f7)](this['subject']()['skills']()),_0x1d487b=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x120c86=_0xa49282[_0x134127(0x150)](_0x349d42=>_0x349d42&&_0x349d42[_0x134127(0x202)][_0x134127(0x172)](_0x1d487b)?Number(RegExp['$1'])*0.01:0x0);_0x15dff3=_0x120c86[_0x134127(0x234)]((_0x20e665,_0x5596ec)=>_0x20e665+_0x5596ec,_0x15dff3),this['item']()['note']['match'](/<(?:ATB|TPB) INSTANT>/i)&&(_0x15dff3=0xa),this[_0x134127(0x24e)]()[_0x134127(0x1fc)](_0x15dff3);},Game_BattlerBase['prototype'][_0xc67d6b(0x2f5)]=function(_0xed8701){const _0x416296=_0xc67d6b;this[_0x416296(0x1ee)]=_0xed8701[_0x416296(0x170)](0x0,0x1);},Game_BattlerBase[_0xc67d6b(0x1ea)]['changeAtbChargeTime']=function(_0x31f36c){const _0x3b3828=_0xc67d6b;this[_0x3b3828(0x2f5)](this['_tpbChargeTime']+_0x31f36c);},Game_BattlerBase['prototype']['setAtbCastTime']=function(_0x305949){const _0x5f0690=_0xc67d6b,_0x11a820=this[_0x5f0690(0x299)]();this['_tpbCastTime']=(_0x11a820*_0x305949)['clamp'](0x0,_0x11a820);},Game_BattlerBase['prototype'][_0xc67d6b(0x111)]=function(_0x4d58d5){const _0x330af7=_0xc67d6b,_0x27aa39=this[_0x330af7(0x299)](),_0x3e23f6=_0x27aa39*_0x4d58d5;this[_0x330af7(0x2ae)]=(this[_0x330af7(0x2ae)]+_0x3e23f6)['clamp'](0x0,_0x27aa39);},VisuMZ[_0xc67d6b(0x307)]['Game_BattlerBase_die']=Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0xfa)],Game_BattlerBase[_0xc67d6b(0x1ea)]['die']=function(){const _0x3838bd=_0xc67d6b;VisuMZ[_0x3838bd(0x307)]['Game_BattlerBase_die'][_0x3838bd(0x289)](this),BattleManager[_0x3838bd(0x27e)]()&&(_0x3838bd(0x1e7)==='BrIrx'?this[_0x3838bd(0x204)]():(this['clearTpbChargeTime'](),this[_0x3838bd(0x1fd)](),this[_0x3838bd(0x2ae)]=0x0));},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0xed)]=Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x308)],Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x308)]=function(){const _0x4d023b=_0xc67d6b;VisuMZ[_0x4d023b(0x307)]['Game_BattlerBase_revive'][_0x4d023b(0x289)](this),BattleManager[_0x4d023b(0x27e)]()&&(_0x4d023b(0x21a)!==_0x4d023b(0x2f1)?this[_0x4d023b(0x204)]():(_0x878bc7[_0x4d023b(0x307)][_0x4d023b(0x30c)][_0x4d023b(0x289)](this),this[_0x4d023b(0x1a3)]()&&_0x692f52[_0x4d023b(0x2c6)]()&&this['battler']()&&(this['battler']()[_0x4d023b(0x155)]=!![],this[_0x4d023b(0x282)]()[_0x4d023b(0x184)]())));},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x24f)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x241)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x241)]=function(_0x2e6c79){const _0x205ffb=_0xc67d6b;BattleManager[_0x205ffb(0x2c6)]()?this[_0x205ffb(0x25c)](_0x2e6c79):VisuMZ[_0x205ffb(0x307)]['Game_Battler_initTpbChargeTime'][_0x205ffb(0x289)](this,_0x2e6c79);},Game_Battler['prototype']['initTpbChargeTimeATB']=function(_0x1d3ac0){const _0x56bcd8=_0xc67d6b,_0x18ee57=VisuMZ[_0x56bcd8(0x307)]['Settings'][_0x56bcd8(0x18e)];let _0x36014d=this[_0x56bcd8(0x186)]()*eval(_0x18ee57[_0x56bcd8(0x2d3)]);const _0x2f881c=this['traitObjects']()[_0x56bcd8(0x2f7)](this[_0x56bcd8(0x165)]()),_0x1dcc94=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x30e843=_0x2f881c[_0x56bcd8(0x150)](_0x4e843a=>_0x4e843a&&_0x4e843a['note'][_0x56bcd8(0x172)](_0x1dcc94)?Number(RegExp['$1'])*0.01:0x0);_0x36014d=_0x30e843[_0x56bcd8(0x234)]((_0x402a35,_0x5c065b)=>_0x402a35+_0x5c065b,_0x36014d),this['_tpbState']=_0x56bcd8(0x29f),this['_tpbChargeTime']=(_0x1d3ac0?0x1:_0x36014d)[_0x56bcd8(0x170)](0x0,0x1),this['isRestricted']()&&(this[_0x56bcd8(0x1ee)]=0x0);},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0xf8)]=function(){const _0x5e9fde=_0xc67d6b;return this[_0x5e9fde(0x14a)]===_0x5e9fde(0x29f);},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x23c)]=function(){const _0x38449a=_0xc67d6b;return this['_tpbState']===_0x38449a(0x1db)&&this['currentAction']()&&this['currentAction']()[_0x38449a(0x148)]()&&this['currentAction']()[_0x38449a(0x148)]()[_0x38449a(0x18c)]<0x0;},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x256)]=function(){const _0x198be5=_0xc67d6b;return this[_0x198be5(0x23c)]()?this['_tpbCastTime']/this[_0x198be5(0x299)]():0x0;},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x10d)]=function(){const _0x20c746=_0xc67d6b;return!this[_0x20c746(0x267)]();},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x1fc)]=function(_0x2b15e7){this['_atbAfterSpeed']=_0x2b15e7;},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1f8)]=BattleManager['endBattlerActions'],BattleManager[_0xc67d6b(0x259)]=function(_0x4563aa){const _0x470b1c=_0xc67d6b;this[_0x470b1c(0x27e)]()&&!_0x4563aa[_0x470b1c(0x267)]()&&(_0x4563aa['_onRestrictBypassAtbReset']=!![]),VisuMZ[_0x470b1c(0x307)]['BattleManager_endBattlerActions'][_0x470b1c(0x289)](this,_0x4563aa),_0x4563aa[_0x470b1c(0x1a3)]()&&this[_0x470b1c(0x27e)]()&&!_0x4563aa[_0x470b1c(0x267)]()&&(_0x4563aa[_0x470b1c(0x134)]=![]);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1fe)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x204)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x204)]=function(){const _0x535d94=_0xc67d6b;if(this[_0x535d94(0x134)])return;VisuMZ[_0x535d94(0x307)][_0x535d94(0x1fe)][_0x535d94(0x289)](this),this[_0x535d94(0x1ee)]+=this[_0x535d94(0x168)]||0x0;},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x2df)]=function(){const _0x18c787=_0xc67d6b;if(!this[_0x18c787(0x23c)]())return;if(!this[_0x18c787(0x144)]())return;if(!this[_0x18c787(0x144)]()['item']())return;if(this[_0x18c787(0x144)]()[_0x18c787(0x148)]()[_0x18c787(0x202)][_0x18c787(0x172)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x18c787(0x1fd)](),this[_0x18c787(0x204)](),this[_0x18c787(0x2ae)]=0x0,this[_0x18c787(0x228)]();},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x228)]=function(){const _0x10801d=_0xc67d6b,_0xa62785=VisuMZ[_0x10801d(0x307)]['Settings'][_0x10801d(0x1e4)];if(Imported['VisuMZ_0_CoreEngine']){const _0x26dc57=_0xa62785['InterruptAnimationID'],_0x4d67f4=_0xa62785['InterruptMirror'],_0x21e542=_0xa62785[_0x10801d(0x19a)];$gameTemp['requestFauxAnimation']([this],_0x26dc57,_0x4d67f4,_0x21e542);}if(this['battler']()&&_0xa62785[_0x10801d(0x1b8)][_0x10801d(0x117)]>0x0){const _0x4a9779=_0xa62785['InterruptText'],_0x59b0da={'textColor':ColorManager[_0x10801d(0xee)](_0xa62785[_0x10801d(0x135)]),'flashColor':_0xa62785[_0x10801d(0x1b2)],'flashDuration':_0xa62785[_0x10801d(0x154)]};this['setupTextPopup'](_0x4a9779,_0x59b0da);}},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x100)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x192)],Game_Battler[_0xc67d6b(0x1ea)]['startTpbCasting']=function(){const _0xd7b64c=_0xc67d6b;VisuMZ[_0xd7b64c(0x307)]['Game_Battler_startTpbCasting']['call'](this),BattleManager['isATB']()&&(this[_0xd7b64c(0x2ae)]>=this['tpbRequiredCastTime']()&&(this[_0xd7b64c(0x14a)]=_0xd7b64c(0x2f0)));},VisuMZ['BattleSystemATB'][_0xc67d6b(0xfc)]=Game_Unit[_0xc67d6b(0x1ea)][_0xc67d6b(0x1a9)],Game_Unit['prototype'][_0xc67d6b(0x1a9)]=function(){const _0x15ccbb=_0xc67d6b;if(BattleManager['isATB']()){if('zAcRY'===_0x15ccbb(0x15c)){if(this['_onRestrictBypassAtbReset'])return;_0x3be2d0[_0x15ccbb(0x307)][_0x15ccbb(0x1fe)][_0x15ccbb(0x289)](this),this['_tpbChargeTime']+=this['_atbAfterSpeed']||0x0;}else{if(BattleManager['allBattleMembers']()[_0x15ccbb(0xe8)](_0x4dee0d=>_0x4dee0d&&_0x4dee0d['isAlive']()&&_0x4dee0d[_0x15ccbb(0x20a)]()&&_0x4dee0d['_tpbState']===_0x15ccbb(0x2f0)))return;}}VisuMZ[_0x15ccbb(0x307)][_0x15ccbb(0xfc)]['call'](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x212)]=Game_Battler[_0xc67d6b(0x1ea)]['onRestrict'],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x26f)]=function(){const _0x1f8e6a=_0xc67d6b;!VisuMZ['BattleSystemATB']['Settings'][_0x1f8e6a(0x18e)][_0x1f8e6a(0x19c)]&&(this['_onRestrictBypassAtbReset']=BattleManager[_0x1f8e6a(0x2c6)]()),VisuMZ[_0x1f8e6a(0x307)][_0x1f8e6a(0x212)][_0x1f8e6a(0x289)](this),BattleManager['isTpb']()&&this['_tpbState']===_0x1f8e6a(0x15e)&&this[_0x1f8e6a(0x1a3)]()&&(_0x1f8e6a(0x2b8)!=='ktJhh'?this[_0x1f8e6a(0x2f5)](this[_0x1f8e6a(0x1ee)]+_0x116271):this[_0x1f8e6a(0x1ff)]=!![]),this[_0x1f8e6a(0x134)]=undefined;},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x270)]=Game_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x1fd)],Game_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x1fd)]=function(){const _0x5dfda6=_0xc67d6b;if(this['_onRestrictBypassAtbReset']){if(!this[_0x5dfda6(0x23c)]())return;}VisuMZ[_0x5dfda6(0x307)][_0x5dfda6(0x270)][_0x5dfda6(0x289)](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x2f6)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x262)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x262)]=function(_0x1f437a){const _0x201e90=_0xc67d6b,_0x528f45=!this[_0x201e90(0x267)]()&&BattleManager[_0x201e90(0x27e)](),_0x34bb30=this[_0x201e90(0x2bd)](_0x1f437a);VisuMZ['BattleSystemATB'][_0x201e90(0x2f6)][_0x201e90(0x289)](this,_0x1f437a);if(this['isEnemy']()&&_0x34bb30&&!this[_0x201e90(0x2bd)](_0x1f437a))'YKjgz'===_0x201e90(0x295)?(_0x528f45&&this[_0x201e90(0x267)]()&&this[_0x201e90(0x1ff)]&&(_0x201e90(0xea)===_0x201e90(0xea)?(this[_0x201e90(0x204)](),this[_0x201e90(0x1fd)](),this[_0x201e90(0x2ae)]=0x0):this[_0x201e90(0x14d)]=_0x544570),this[_0x201e90(0x15a)](_0x201e90(0x181))):_0x1533d4=this[_0x201e90(0x24e)]()[_0x201e90(0x1ee)];else _0x528f45&&this['canMove']()&&this['numActions']()<=0x0&&(this['makeActions'](),this[_0x201e90(0x14a)]=_0x201e90(0x29f),this[_0x201e90(0x134)]=undefined);},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0xf3)]=function(){const _0x58a333=_0xc67d6b;this[_0x58a333(0x231)](_0x58a333(0x276)),this['_tpbTurnEnd']=![],this[_0x58a333(0x242)]++,this[_0x58a333(0xf4)]=0x0,this[_0x58a333(0x301)]()&&this[_0x58a333(0xfd)](),this[_0x58a333(0x231)]('PostStartTurnJS');},Game_Battler['prototype'][_0xc67d6b(0x301)]=function(){const _0xff4669=_0xc67d6b;if(this['numActions']()!==0x0)return![];if(BattleManager[_0xff4669(0x2c6)]()){if(_0xff4669(0x26b)===_0xff4669(0x26b)){if(this['isEnemy']()){if(!this[_0xff4669(0x17c)]())return![];}}else _0x38a223(_0xff4669(0x174)[_0xff4669(0x297)](_0x1be504,_0x2bfe4f)),_0x4bd3d5[_0xff4669(0x109)]();}return!![];},VisuMZ['BattleSystemATB'][_0xc67d6b(0x1d2)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x14b)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x14b)]=function(){const _0x471a9e=_0xc67d6b;if(BattleManager[_0x471a9e(0x2c6)]())this[_0x471a9e(0x24c)]();else{if(_0x471a9e(0x18d)!=='NcIno')VisuMZ[_0x471a9e(0x307)][_0x471a9e(0x1d2)]['call'](this);else{if(!_0x234d88[_0x471a9e(0x130)]())return;if(!_0x233b9d[_0x471a9e(0x2c6)]())return;if(this[_0x471a9e(0x148)]())this['applyItemBattleSystemATBUserEffect'](_0x3b92d9);}}},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x24c)]=function(){const _0x2f85c1=_0xc67d6b;this[_0x2f85c1(0x14a)]=_0x2f85c1(0x29f),this[_0x2f85c1(0x1ee)]+=VisuMZ[_0x2f85c1(0x307)][_0x2f85c1(0xec)][_0x2f85c1(0x18e)]['EscapeFailPenalty']||0x0;},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x20c)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x220)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x220)]=function(){const _0x5bcfe8=_0xc67d6b;if(BattleManager['isATB']())return VisuMZ['BattleSystemATB'][_0x5bcfe8(0xec)][_0x5bcfe8(0x18e)][_0x5bcfe8(0xfe)][_0x5bcfe8(0x289)](this,this);else{if(_0x5bcfe8(0x21d)==='qcqYC')return VisuMZ[_0x5bcfe8(0x307)]['Game_Battler_tpbSpeed'][_0x5bcfe8(0x289)](this);else for(let _0x29aca8=0x1;_0x29aca8<=0x2;_0x29aca8++){const _0x586ee9=_0x4ac485+_0x29aca8;this['_atbColors'][_0x586ee9]=this[_0x5bcfe8(0xee)](_0x3c5da3[_0x586ee9]);}}},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x2ab)]=Game_Battler[_0xc67d6b(0x1ea)]['tpbBaseSpeed'],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0xf1)]=function(){const _0x4799ad=_0xc67d6b;return BattleManager[_0x4799ad(0x2c6)]()?VisuMZ[_0x4799ad(0x307)]['Settings']['Mechanics'][_0x4799ad(0x2d9)][_0x4799ad(0x289)](this,this):VisuMZ['BattleSystemATB'][_0x4799ad(0x2ab)]['call'](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x1fb)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x186)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x186)]=function(){const _0x25ad01=_0xc67d6b;return BattleManager[_0x25ad01(0x2c6)]()?VisuMZ[_0x25ad01(0x307)][_0x25ad01(0xec)][_0x25ad01(0x18e)][_0x25ad01(0x125)]['call'](this,this):VisuMZ['BattleSystemATB'][_0x25ad01(0x1fb)][_0x25ad01(0x289)](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x27d)]=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x133)],Game_Battler['prototype']['tpbAcceleration']=function(){const _0x5c54a6=_0xc67d6b;return BattleManager['isATB']()?this['atbAcceleration']():_0x5c54a6(0x287)!=='lZMnR'?VisuMZ['BattleSystemATB'][_0x5c54a6(0x27d)][_0x5c54a6(0x289)](this):_0x331904*(_0xd45cbe*0x2);},Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x1ba)]=function(){const _0x2c4552=_0xc67d6b;let _0x582765=VisuMZ['BattleSystemATB']['Settings']['Mechanics'][_0x2c4552(0x2db)][_0x2c4552(0x289)](this,this);if(ConfigManager&&ConfigManager[_0x2c4552(0x17d)]!==undefined){const _0x5f1f2d=ConfigManager[_0x2c4552(0x17d)]-0x3;if(_0x5f1f2d>0x0)return'mGeWS'!==_0x2c4552(0x1d0)?_0x582765*(_0x5f1f2d*0x2):_0x2c4552(0x209)[_0x2c4552(0x297)](_0x109af2(_0x492f03['$1']));else{if(_0x5f1f2d<0x0)return _0x582765*(0x1/(_0x5f1f2d*-0x2));}}return _0x582765;},VisuMZ[_0xc67d6b(0x307)]['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x299)],Game_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x299)]=function(){const _0x1289c3=_0xc67d6b;if(BattleManager[_0x1289c3(0x2c6)]()){if('aMwdp'===_0x1289c3(0x293))return this[_0x1289c3(0x107)]===_0x4473de&&(this[_0x1289c3(0x107)]=this['createFieldAtbGraphicFaceName']()),this[_0x1289c3(0x107)];else{const _0x409d1d=this[_0x1289c3(0x110)]['map'](_0x2efc06=>_0x2efc06[_0x1289c3(0x148)]());for(const _0x353aed of _0x409d1d){if(_0x1289c3(0x286)!==_0x1289c3(0x286)){const _0x91154=this[_0x1289c3(0x1ce)]()[_0x1289c3(0x202)];if(_0x91154['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x5b8374(_0x3efa74['$2']);return _0x3d83ac[_0x1289c3(0xec)][_0x1289c3(0x2e3)];}else{if(!_0x353aed)continue;_0x353aed[_0x1289c3(0x201)]=_0x353aed[_0x1289c3(0x201)]??_0x353aed[_0x1289c3(0x18c)];}}let _0x54dc67=VisuMZ[_0x1289c3(0x307)]['Settings'][_0x1289c3(0x18e)]['TpbCastTimeJS']['call'](this,this);for(const _0x45b6f7 of _0x409d1d){if('Cptkh'===_0x1289c3(0x1f1)){const _0x22cc23=this[_0x1289c3(0x282)]();if(!_0x22cc23)return;const _0x73b1ce=_0x22cc23[_0x1289c3(0x282)]();if(!_0x73b1ce)return;const _0x4fd516=_0x73b1ce[_0x1289c3(0x1b1)]();if(!_0x4fd516)return;this['setBlendColor'](_0x4fd516[_0x1289c3(0x2eb)]);}else{if(!_0x45b6f7)continue;_0x45b6f7[_0x1289c3(0x18c)]=_0x45b6f7[_0x1289c3(0x201)];}}return _0x54dc67;}}else{if(_0x1289c3(0x1f0)!=='RVQch')return VisuMZ['BattleSystemATB']['Game_Battler_tpbRequiredCastTime'][_0x1289c3(0x289)](this);else this[_0x1289c3(0x1ad)]['x']=0.5,this[_0x1289c3(0x1ad)]['y']=0.5;}},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x23d)]=Scene_Options[_0xc67d6b(0x1ea)]['maxCommands'],Scene_Options[_0xc67d6b(0x1ea)][_0xc67d6b(0x180)]=function(){const _0x115054=_0xc67d6b;let _0x2e1cde=VisuMZ[_0x115054(0x307)][_0x115054(0x23d)][_0x115054(0x289)](this);const _0x176d36=VisuMZ[_0x115054(0x307)][_0x115054(0xec)];if(_0x176d36[_0x115054(0x216)]['AddOption']&&_0x176d36['Options'][_0x115054(0x137)]&&BattleManager[_0x115054(0x2c6)]())_0x2e1cde++;return _0x2e1cde;},Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x2da)]=function(){const _0x278727=_0xc67d6b;if(!BattleManager[_0x278727(0x2c6)]())return;if(!ConfigManager[_0x278727(0x1ac)])return;const _0xcb7635=VisuMZ[_0x278727(0x307)]['Settings'][_0x278727(0x20b)],_0x58c9e7=new Sprite_Gauge();_0x58c9e7[_0x278727(0x1ad)]['x']=_0xcb7635[_0x278727(0x247)],_0x58c9e7[_0x278727(0x1ad)]['y']=_0xcb7635[_0x278727(0x305)],_0x58c9e7[_0x278727(0x1a7)]['x']=_0x58c9e7[_0x278727(0x1a7)]['y']=_0xcb7635['Scale'],this[_0x278727(0x2ec)]=_0x58c9e7,this['addChild'](this[_0x278727(0x2ec)]);},VisuMZ['BattleSystemATB']['Sprite_Battler_setBattler']=Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x143)],Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x143)]=function(_0x839150){const _0x17c12b=_0xc67d6b;VisuMZ[_0x17c12b(0x307)][_0x17c12b(0x263)][_0x17c12b(0x289)](this,_0x839150),this[_0x17c12b(0x1a2)](_0x839150),this[_0x17c12b(0x184)]();},Sprite_Battler[_0xc67d6b(0x1ea)]['setupAtbGaugeSprite']=function(_0x48b64d){const _0x2eee50=_0xc67d6b;if(!_0x48b64d)return;if(!this[_0x2eee50(0x2ec)])return;if(_0x48b64d[_0x2eee50(0x28e)]()){}else{if(_0x48b64d[_0x2eee50(0x1a3)]()){if(_0x2eee50(0x24a)!==_0x2eee50(0x2c7)){if(this[_0x2eee50(0x2fd)]===Sprite_Enemy&&_0x48b64d[_0x2eee50(0x187)]())return;if(this[_0x2eee50(0x2fd)]===Sprite_SvEnemy&&!_0x48b64d[_0x2eee50(0x187)]())return;}else _0x2be437[_0x2eee50(0x307)][_0x2eee50(0x198)][_0x2eee50(0x289)](this),this[_0x2eee50(0x2c2)]();}}this[_0x2eee50(0x2ec)][_0x2eee50(0x14f)](_0x48b64d,_0x2eee50(0x2d2));},Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x184)]=function(){const _0x1810c0=_0xc67d6b;if(!this[_0x1810c0(0x2ec)])return;const _0x248b82=this[_0x1810c0(0x223)]&&this[_0x1810c0(0x223)][_0x1810c0(0x20a)]()&&!this[_0x1810c0(0x223)][_0x1810c0(0x1c7)]();this[_0x1810c0(0x2ec)][_0x1810c0(0x1d4)]=_0x248b82,this[_0x1810c0(0x194)]&&this[_0x1810c0(0x194)]['_atbGaugeSprite']&&(_0x1810c0(0x28b)===_0x1810c0(0x12d)?(this[_0x1810c0(0x13d)]=_0x298a0,this['_unit']=_0x4b9bac,this[_0x1810c0(0x266)]=_0x5d41f7,_0x4215f2[_0x1810c0(0x1ea)][_0x1810c0(0x1b6)][_0x1810c0(0x289)](this),this['initMembers'](),this[_0x1810c0(0x1bb)](),this[_0x1810c0(0x306)]=this[_0x1810c0(0x203)]()):this[_0x1810c0(0x194)][_0x1810c0(0x2ec)][_0x1810c0(0x1d4)]=_0x248b82);},VisuMZ[_0xc67d6b(0x307)]['Sprite_Battler_updateMain']=Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x232)],Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x232)]=function(){const _0xc3ebce=_0xc67d6b;VisuMZ[_0xc3ebce(0x307)][_0xc3ebce(0x1b4)]['call'](this),this[_0xc3ebce(0x292)]();},Sprite_Battler[_0xc67d6b(0x1ea)]['updateAtbGaugeSpritePosition']=function(){const _0x536f3d=_0xc67d6b;if(!this[_0x536f3d(0x223)])return;if(!this[_0x536f3d(0x2ec)])return;const _0x310fcb=VisuMZ[_0x536f3d(0x307)][_0x536f3d(0xec)][_0x536f3d(0x20b)],_0x41c3d2=this[_0x536f3d(0x2ec)];let _0xfbee10=_0x310fcb[_0x536f3d(0x14e)];this[_0x536f3d(0x223)]['battleUIOffsetX']&&(_0xfbee10+=this[_0x536f3d(0x223)]['battleUIOffsetX']());let _0x26de8a=_0x310fcb[_0x536f3d(0x2bf)];this[_0x536f3d(0x223)][_0x536f3d(0x2f2)]&&(_0x26de8a+=this[_0x536f3d(0x223)][_0x536f3d(0x2f2)]()),_0x41c3d2['x']=_0xfbee10,_0x41c3d2['y']=-this['height']+_0x26de8a,this[_0x536f3d(0x223)][_0x536f3d(0x1a3)]()&&(this[_0x536f3d(0x223)][_0x536f3d(0x1ce)]()[_0x536f3d(0x202)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x41c3d2[_0x536f3d(0x1d4)]=![])),this['checkAggroControlSystemOffsetYAdjustment']()&&(_0x41c3d2['y']+=_0x41c3d2['gaugeHeight']()*_0x310fcb[_0x536f3d(0x2b5)]-0x1),this[_0x536f3d(0x1a7)]['x']<0x0&&(_0x41c3d2[_0x536f3d(0x1a7)]['x']=-Math['abs'](_0x41c3d2[_0x536f3d(0x1a7)]['x']));},Sprite_Battler['prototype'][_0xc67d6b(0x2e5)]=function(){const _0x1b6813=_0xc67d6b;if(!Imported[_0x1b6813(0x1f4)])return![];if(this[_0x1b6813(0x223)]&&this[_0x1b6813(0x223)]['isEnemy']())return![];const _0x4a304d=VisuMZ['AggroControlSystem'][_0x1b6813(0xec)]['Aggro'];if(!_0x4a304d[_0x1b6813(0x23e)])return![];if(!ConfigManager[_0x1b6813(0x2b7)])return![];const _0x3ae0cf=VisuMZ['BattleSystemATB'][_0x1b6813(0xec)][_0x1b6813(0x20b)];return _0x4a304d[_0x1b6813(0x2b5)]===_0x3ae0cf['Scale']&&_0x4a304d[_0x1b6813(0x247)]===_0x3ae0cf['AnchorX']&&_0x4a304d[_0x1b6813(0x305)]===_0x3ae0cf[_0x1b6813(0x305)]&&_0x4a304d[_0x1b6813(0x14e)]===_0x3ae0cf[_0x1b6813(0x14e)]&&_0x4a304d[_0x1b6813(0x2bf)]===_0x3ae0cf[_0x1b6813(0x2bf)]&&!![];},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x16a)]=Sprite_Battler['prototype'][_0xc67d6b(0x169)],Sprite_Battler[_0xc67d6b(0x1ea)][_0xc67d6b(0x169)]=function(){const _0x3cba4d=_0xc67d6b;VisuMZ['BattleSystemATB'][_0x3cba4d(0x16a)][_0x3cba4d(0x289)](this),!this[_0x3cba4d(0x223)]&&this[_0x3cba4d(0x2ec)]&&(this['_atbGaugeSprite'][_0x3cba4d(0x1d4)]=![],this[_0x3cba4d(0x194)]&&(this['_svBattlerSprite'][_0x3cba4d(0x2ec)][_0x3cba4d(0x1d4)]=![]));},VisuMZ['BattleSystemATB']['Sprite_Actor_createStateSprite']=Sprite_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x10c)],Sprite_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x10c)]=function(){const _0x2088b9=_0xc67d6b;VisuMZ[_0x2088b9(0x307)]['Sprite_Actor_createStateSprite'][_0x2088b9(0x289)](this),this[_0x2088b9(0x2cf)]()&&this[_0x2088b9(0x2da)]();},Sprite_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x2cf)]=function(){const _0x2ec929=_0xc67d6b;return VisuMZ[_0x2ec929(0x307)][_0x2ec929(0xec)][_0x2ec929(0x20b)]['ShowActorGauge'];},Sprite_SvEnemy[_0xc67d6b(0x1ea)][_0xc67d6b(0x2cf)]=function(){const _0x15421e=_0xc67d6b;return VisuMZ[_0x15421e(0x307)]['Settings'][_0x15421e(0x20b)][_0x15421e(0x302)];},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x23b)]=Sprite_Enemy['prototype'][_0xc67d6b(0x1b9)],Sprite_Enemy[_0xc67d6b(0x1ea)][_0xc67d6b(0x1b9)]=function(){const _0x31830f=_0xc67d6b;VisuMZ[_0x31830f(0x307)]['Settings']['Gauge'][_0x31830f(0x302)]&&this[_0x31830f(0x2da)](),VisuMZ[_0x31830f(0x307)][_0x31830f(0x23b)]['call'](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x157)]=Sprite_Enemy['prototype'][_0xc67d6b(0x22a)],Sprite_Enemy['prototype'][_0xc67d6b(0x22a)]=function(_0x448068){const _0x1659b6=_0xc67d6b;VisuMZ['BattleSystemATB'][_0x1659b6(0x157)][_0x1659b6(0x289)](this,_0x448068),(_0x448068===_0x1659b6(0x196)||_0x1659b6(0xf2))&&this[_0x1659b6(0x184)]();},VisuMZ['BattleSystemATB']['Game_BattlerBase_appear']=Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x196)],Game_BattlerBase['prototype']['appear']=function(){const _0x3e879c=_0xc67d6b;VisuMZ[_0x3e879c(0x307)][_0x3e879c(0x30c)][_0x3e879c(0x289)](this),this[_0x3e879c(0x1a3)]()&&BattleManager[_0x3e879c(0x2c6)]()&&this[_0x3e879c(0x282)]()&&(_0x3e879c(0x1d3)!=='svsfN'?(this[_0x3e879c(0x282)]()['_fnord']=!![],this[_0x3e879c(0x282)]()['updateAtbGaugeSpriteVisibility']()):(this[_0x3e879c(0x266)]=new _0x4b1554(),this[_0x3e879c(0x129)](this[_0x3e879c(0x266)]),this[_0x3e879c(0x113)]()));},VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0xc67d6b(0x1ea)]['gaugeColor1'],Sprite_Gauge['prototype']['gaugeColor1']=function(){const _0x9e52a8=_0xc67d6b;if(this[_0x9e52a8(0x2b2)]==='time')return this[_0x9e52a8(0x252)](0x1);return VisuMZ[_0x9e52a8(0x307)]['Sprite_Gauge_gaugeColor1'][_0x9e52a8(0x289)](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x22f)]=Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x2e7)],Sprite_Gauge['prototype'][_0xc67d6b(0x2e7)]=function(){const _0x8bcf28=_0xc67d6b;if(this[_0x8bcf28(0x2b2)]==='time')return this[_0x8bcf28(0x252)](0x2);return VisuMZ[_0x8bcf28(0x307)][_0x8bcf28(0x22f)][_0x8bcf28(0x289)](this);},Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x252)]=function(_0x424068){const _0x406ec4=_0xc67d6b;if(!this[_0x406ec4(0x223)])return ColorManager[_0x406ec4(0x199)](_0x406ec4(0x2a4)[_0x406ec4(0x297)](_0x424068));if(this[_0x406ec4(0x223)]['atbStopped']())return ColorManager['atbColor']('stop%1'[_0x406ec4(0x297)](_0x424068));if(this[_0x406ec4(0x223)][_0x406ec4(0x23c)]())return ColorManager[_0x406ec4(0x199)](_0x406ec4(0x265)[_0x406ec4(0x297)](_0x424068));if(this[_0x406ec4(0x15b)]()>=0x1)return ColorManager[_0x406ec4(0x199)](_0x406ec4(0x2b9)[_0x406ec4(0x297)](_0x424068));const _0x279fdd=VisuMZ[_0x406ec4(0x307)]['Settings'][_0x406ec4(0x20b)],_0x5943d1=this[_0x406ec4(0x223)][_0x406ec4(0x1bc)](0x6)*this[_0x406ec4(0x223)]['paramBuffRate'](0x6);if(_0x5943d1<=_0x279fdd[_0x406ec4(0x229)])return ColorManager['atbColor'](_0x406ec4(0x1f5)[_0x406ec4(0x297)](_0x424068));if(_0x5943d1>=_0x279fdd[_0x406ec4(0x156)])return ColorManager[_0x406ec4(0x199)](_0x406ec4(0x2c0)['format'](_0x424068));return ColorManager[_0x406ec4(0x199)](_0x406ec4(0x2a4)[_0x406ec4(0x297)](_0x424068));},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x2ac)]=Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x2a9)],Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x2a9)]=function(){const _0x4e4dee=_0xc67d6b;if(this[_0x4e4dee(0x223)]&&this['_statusType']===_0x4e4dee(0x2d2))return this['atbCurrentValue']();return VisuMZ[_0x4e4dee(0x307)][_0x4e4dee(0x2ac)]['call'](this);},Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x1d6)]=function(){const _0x35c780=_0xc67d6b;return this[_0x35c780(0x223)][_0x35c780(0x23c)]()?_0x35c780(0x27a)!==_0x35c780(0x2c9)?Math[_0x35c780(0x1be)](this[_0x35c780(0x223)][_0x35c780(0x2ae)],0x0):_0x4c45f8(_0xa72fe8['$1']):VisuMZ[_0x35c780(0x307)]['Sprite_Gauge_currentValue']['call'](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x11d)]=Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x224)],Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x224)]=function(){const _0x5927f1=_0xc67d6b;if(this['_battler']&&this[_0x5927f1(0x2b2)]==='time')return this[_0x5927f1(0x251)]();return VisuMZ['BattleSystemATB'][_0x5927f1(0x11d)]['call'](this);},Sprite_Gauge[_0xc67d6b(0x1ea)][_0xc67d6b(0x251)]=function(){const _0xb6daea=_0xc67d6b;if(this['_battler'][_0xb6daea(0x23c)]()){if(_0xb6daea(0x22b)!==_0xb6daea(0x2b1))return Math[_0xb6daea(0x1be)](this[_0xb6daea(0x223)][_0xb6daea(0x299)](),1e-9);else{if(!this[_0xb6daea(0x1ef)])return;const _0x2cb517=this[_0xb6daea(0x1ef)][_0xb6daea(0x237)];if(!_0x2cb517)return;_0x2cb517[_0xb6daea(0xe9)](this['compareBattlerSprites'][_0xb6daea(0x1e0)](this));}}else return VisuMZ['BattleSystemATB']['Sprite_Gauge_currentMaxValue'][_0xb6daea(0x289)](this);},VisuMZ[_0xc67d6b(0x307)][_0xc67d6b(0x11f)]=Window_Help[_0xc67d6b(0x1ea)]['setItem'],Window_Help['prototype'][_0xc67d6b(0x25e)]=function(_0x4c6927){const _0x30cc00=_0xc67d6b;if(BattleManager['isATB']()&&_0x4c6927&&_0x4c6927[_0x30cc00(0x202)]&&_0x4c6927[_0x30cc00(0x202)][_0x30cc00(0x172)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i))this[_0x30cc00(0x11e)](String(RegExp['$1']));else{if(_0x30cc00(0x1e9)===_0x30cc00(0x28a)){if(_0x25b06b['createKeyJS'])return _0x461ef2[_0x30cc00(0x1cb)](_0x3b5805,_0x14de64);let _0x88e519='';if(_0x992a1e['includes'](_0x2a460))_0x88e519=_0x30cc00(0x16c)[_0x30cc00(0x297)](_0x402eb5['id'],_0x34d3cb);if(_0xdb5302['includes'](_0x37ae7b))_0x88e519=_0x30cc00(0x1c6)[_0x30cc00(0x297)](_0xbca95f['id'],_0xb68e1e);if(_0x1cb7db[_0x30cc00(0x167)](_0x1d1695))_0x88e519=_0x30cc00(0x1a4)[_0x30cc00(0x297)](_0x12ffec['id'],_0x3e72f8);if(_0x19f669[_0x30cc00(0x167)](_0xc5d466))_0x88e519=_0x30cc00(0x119)[_0x30cc00(0x297)](_0x32463c['id'],_0x55c484);if(_0x3e7ad1[_0x30cc00(0x167)](_0x296162))_0x88e519='Weapon-%1-%2'[_0x30cc00(0x297)](_0x3419d0['id'],_0x144b97);if(_0x3cc583[_0x30cc00(0x167)](_0x5c04d9))_0x88e519=_0x30cc00(0x2c3)[_0x30cc00(0x297)](_0x55d372['id'],_0xdc52f2);if(_0x547a70[_0x30cc00(0x167)](_0x349354))_0x88e519='Enemy-%1-%2'[_0x30cc00(0x297)](_0x992c7f['id'],_0x5db931);if(_0x3239c1[_0x30cc00(0x167)](_0x3c6994))_0x88e519=_0x30cc00(0x248)['format'](_0xa257e4['id'],_0x444db0);return _0x88e519;}else VisuMZ['BattleSystemATB'][_0x30cc00(0x11f)]['call'](this,_0x4c6927);}},VisuMZ['BattleSystemATB'][_0xc67d6b(0x20d)]=Window_StatusBase['prototype'][_0xc67d6b(0x285)],Window_StatusBase['prototype']['placeGauge']=function(_0x2b817f,_0x66e9fe,_0x3fdaf4,_0x3e1d1a){const _0x52c61c=_0xc67d6b;if(!this['showVisualAtbGauge'](_0x66e9fe))return;VisuMZ[_0x52c61c(0x307)][_0x52c61c(0x20d)][_0x52c61c(0x289)](this,_0x2b817f,_0x66e9fe,_0x3fdaf4,_0x3e1d1a);},Window_StatusBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x1b5)]=function(_0x3ae3ed){const _0x4e1b4e=_0xc67d6b;if(_0x3ae3ed!==_0x4e1b4e(0x2d2))return!![];if(![_0x4e1b4e(0x1ec),'Window_SideviewUiBattleStatus'][_0x4e1b4e(0x167)](this['constructor'][_0x4e1b4e(0x126)]))return![];if(!BattleManager[_0x4e1b4e(0x2c6)]())return![];if(!ConfigManager[_0x4e1b4e(0x1ac)])return![];return VisuMZ[_0x4e1b4e(0x307)][_0x4e1b4e(0xec)][_0x4e1b4e(0x20b)][_0x4e1b4e(0x300)];},VisuMZ[_0xc67d6b(0x307)]['Window_Options_addGeneralOptions']=Window_Options[_0xc67d6b(0x1ea)]['addGeneralOptions'],Window_Options[_0xc67d6b(0x1ea)]['addGeneralOptions']=function(){const _0x1f2aac=_0xc67d6b;VisuMZ[_0x1f2aac(0x307)][_0x1f2aac(0x179)][_0x1f2aac(0x289)](this),this['addBattleSystemATBCommands']();},Window_Options[_0xc67d6b(0x1ea)][_0xc67d6b(0x12f)]=function(){const _0x3e3c88=_0xc67d6b;if(!BattleManager[_0x3e3c88(0x2c6)]())return;VisuMZ[_0x3e3c88(0x307)][_0x3e3c88(0xec)][_0x3e3c88(0x216)][_0x3e3c88(0x2a8)]&&this[_0x3e3c88(0x261)]();},Window_Options['prototype'][_0xc67d6b(0x261)]=function(){const _0x163796=_0xc67d6b,_0x43a1d5=TextManager['visualAtbGauge'],_0x43a338='visualAtbGauge';this[_0x163796(0x1f3)](_0x43a1d5,_0x43a338);},Game_BattlerBase[_0xc67d6b(0x1ea)]['clearFieldAtbGraphics']=function(){const _0x241a9c=_0xc67d6b;delete this[_0x241a9c(0x19e)],delete this[_0x241a9c(0x107)],delete this[_0x241a9c(0x136)],delete this[_0x241a9c(0x14d)];},Game_BattlerBase['prototype'][_0xc67d6b(0x1e1)]=function(){const _0x1eef48=_0xc67d6b;return this[_0x1eef48(0x19e)]===undefined&&(this[_0x1eef48(0x19e)]=this[_0x1eef48(0x2d4)]()),this[_0x1eef48(0x19e)];},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x2d4)]=function(){const _0x470d1e=_0xc67d6b;return Sprite_FieldGaugeATB[_0x470d1e(0xec)][_0x470d1e(0x153)];},Game_BattlerBase[_0xc67d6b(0x1ea)]['fieldAtbGraphicFaceName']=function(){const _0x4c2b5b=_0xc67d6b;return this['_fieldAtbGaugeFaceName']===undefined&&('jHYou'!==_0x4c2b5b(0x108)?this[_0x4c2b5b(0x107)]=this[_0x4c2b5b(0x211)]():(this[_0x4c2b5b(0x1df)]===_0x2bf193&&this[_0x4c2b5b(0x2c2)](),this[_0x4c2b5b(0x1df)]=_0x307089)),this[_0x4c2b5b(0x107)];},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x211)]=function(){const _0x136e3c=_0xc67d6b;return Sprite_FieldGaugeATB[_0x136e3c(0xec)]['EnemyBattlerFaceName'];},Game_BattlerBase['prototype'][_0xc67d6b(0x2a3)]=function(){const _0x2b178c=_0xc67d6b;return this[_0x2b178c(0x136)]===undefined&&(this['_fieldAtbGaugeFaceIndex']=this[_0x2b178c(0x219)]()),this[_0x2b178c(0x136)];},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x219)]=function(){const _0x8f47fc=_0xc67d6b;return Sprite_FieldGaugeATB['Settings'][_0x8f47fc(0x2e3)];},Game_BattlerBase[_0xc67d6b(0x1ea)]['fieldAtbGraphicIconIndex']=function(){const _0x11e176=_0xc67d6b;return this[_0x11e176(0x14d)]===undefined&&(this['_fieldAtbGaugeIconIndex']=this[_0x11e176(0x2ee)]()),this[_0x11e176(0x14d)];},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0x2ee)]=function(){const _0x28413c=_0xc67d6b;return Sprite_FieldGaugeATB['Settings'][_0x28413c(0x24b)];},Game_BattlerBase[_0xc67d6b(0x1ea)][_0xc67d6b(0xf6)]=function(_0x4c4b1b){this['_fieldAtbGaugeIconIndex']=_0x4c4b1b;},Game_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x2d4)]=function(){const _0x192390=_0xc67d6b,_0x500ef3=this[_0x192390(0x106)]()['note'];if(_0x500ef3[_0x192390(0x172)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x500ef3[_0x192390(0x172)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x192390(0xec)][_0x192390(0x1c3)];},Game_Actor[_0xc67d6b(0x1ea)][_0xc67d6b(0x211)]=function(){const _0x5e25dd=_0xc67d6b,_0x256f5d=this[_0x5e25dd(0x106)]()[_0x5e25dd(0x202)];if(_0x256f5d['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5e25dd(0x11b)===_0x5e25dd(0x11b))return String(RegExp['$1']);else _0x2a87a1&&this[_0x5e25dd(0x267)]()&&this['_needsAtbClear']&&(this[_0x5e25dd(0x204)](),this[_0x5e25dd(0x1fd)](),this['_tpbCastTime']=0x0),this[_0x5e25dd(0x15a)](_0x5e25dd(0x181));}return this[_0x5e25dd(0x1b7)]();},Game_Actor['prototype'][_0xc67d6b(0x219)]=function(){const _0x5c24ad=_0xc67d6b,_0x1c300f=this[_0x5c24ad(0x106)]()['note'];if(_0x1c300f[_0x5c24ad(0x172)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0xc67d6b(0x1ea)]['createFieldAtbGraphicIconIndex']=function(){const _0x424835=_0xc67d6b,_0x13182e=this[_0x424835(0x106)]()[_0x424835(0x202)];if(_0x13182e['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x424835(0xec)][_0x424835(0x11c)];},Game_Enemy['prototype'][_0xc67d6b(0x2d4)]=function(){const _0x2f72f0=_0xc67d6b,_0x53034e=this[_0x2f72f0(0x1ce)]()[_0x2f72f0(0x202)];if(_0x53034e[_0x2f72f0(0x172)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2f72f0(0x2b3)===_0x2f72f0(0x2e8))delete this['_fieldAtbGaugeGraphicType'],delete this['_fieldAtbGaugeFaceName'],delete this['_fieldAtbGaugeFaceIndex'],delete this[_0x2f72f0(0x14d)];else return _0x2f72f0(0x2dc);}else{if(_0x53034e['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x2f72f0(0x2a1);}return Sprite_FieldGaugeATB[_0x2f72f0(0xec)][_0x2f72f0(0x153)];},Game_Enemy[_0xc67d6b(0x1ea)][_0xc67d6b(0x211)]=function(){const _0x3e4aa5=_0xc67d6b,_0x38df68=this[_0x3e4aa5(0x1ce)]()[_0x3e4aa5(0x202)];if(_0x38df68[_0x3e4aa5(0x172)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0x3e4aa5(0x1ab)];},Game_Enemy[_0xc67d6b(0x1ea)][_0xc67d6b(0x219)]=function(){const _0x160717=_0xc67d6b,_0x2241b8=this['enemy']()['note'];if(_0x2241b8['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x160717(0xec)][_0x160717(0x2e3)];},Game_Enemy[_0xc67d6b(0x1ea)][_0xc67d6b(0x2ee)]=function(){const _0x39c33f=_0xc67d6b,_0x5c56cb=this['enemy']()[_0x39c33f(0x202)];if(_0x5c56cb[_0x39c33f(0x172)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'iNKdD'===_0x39c33f(0xf0)?Number(RegExp['$1']):_0x12efa6['y']-_0x21ac8b['y'];return Sprite_FieldGaugeATB[_0x39c33f(0xec)][_0x39c33f(0x24b)];},VisuMZ['BattleSystemATB'][_0xc67d6b(0x182)]=Scene_Battle[_0xc67d6b(0x1ea)][_0xc67d6b(0x132)],Scene_Battle[_0xc67d6b(0x1ea)][_0xc67d6b(0x132)]=function(){const _0x9c166b=_0xc67d6b;this['createFieldGaugeContainerATB'](),VisuMZ[_0x9c166b(0x307)][_0x9c166b(0x182)][_0x9c166b(0x289)](this),this[_0x9c166b(0x16f)]();},Scene_Battle[_0xc67d6b(0x1ea)][_0xc67d6b(0x1c5)]=function(){const _0x13c2fb=_0xc67d6b;if(!BattleManager[_0x13c2fb(0x2c6)]())return;if(!Sprite_FieldGaugeATB[_0x13c2fb(0xec)][_0x13c2fb(0x151)])return;if(!ConfigManager[_0x13c2fb(0x1ac)])return;this[_0x13c2fb(0x309)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x8ee71f=this[_0x13c2fb(0x2e0)](this['_windowLayer']);this[_0x13c2fb(0x2d6)](this[_0x13c2fb(0x309)],_0x8ee71f);},Scene_Battle[_0xc67d6b(0x1ea)][_0xc67d6b(0x16f)]=function(){const _0x20da86=_0xc67d6b;if(!BattleManager[_0x20da86(0x2c6)]())return;if(!Sprite_FieldGaugeATB[_0x20da86(0xec)][_0x20da86(0x151)])return;if(!ConfigManager[_0x20da86(0x1ac)])return;this[_0x20da86(0x105)]=new Sprite_FieldGaugeATB(),this[_0x20da86(0x309)][_0x20da86(0x129)](this[_0x20da86(0x105)]);};function Sprite_FieldGaugeATB(){const _0x27d7ad=_0xc67d6b;this[_0x27d7ad(0x1b6)](...arguments);}Sprite_FieldGaugeATB['prototype']=Object['create'](Sprite[_0xc67d6b(0x1ea)]),Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x2fd)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0xc67d6b(0xec)]=JsonEx[_0xc67d6b(0x1ed)](VisuMZ[_0xc67d6b(0x307)]['Settings'][_0xc67d6b(0x238)]),Sprite_FieldGaugeATB['prototype']['initialize']=function(){const _0x3d3837=_0xc67d6b;Sprite[_0x3d3837(0x1ea)]['initialize']['call'](this),this[_0x3d3837(0x243)](),this[_0x3d3837(0x2ba)](),this[_0x3d3837(0x1bb)]();},Sprite_FieldGaugeATB['prototype'][_0xc67d6b(0x243)]=function(){const _0x1092f8=_0xc67d6b;this[_0x1092f8(0x1ad)]['x']=0.5,this[_0x1092f8(0x1ad)]['y']=0.5;},Sprite_FieldGaugeATB['prototype'][_0xc67d6b(0x197)]=function(){const _0x26a9c0=_0xc67d6b;if(this[_0x26a9c0(0x269)]!==undefined)return this[_0x26a9c0(0x269)];const _0x39cd5b=Sprite_FieldGaugeATB[_0x26a9c0(0xec)][_0x26a9c0(0x275)];return this[_0x26a9c0(0x269)]=['top',_0x26a9c0(0x2fc)]['includes'](_0x39cd5b),this[_0x26a9c0(0x269)];},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x2ba)]=function(){const _0x15206c=_0xc67d6b,_0x408bdd=Sprite_FieldGaugeATB[_0x15206c(0xec)]['DisplayPosition'][_0x15206c(0x298)]()[_0x15206c(0x1d9)](),_0x5eddd4=Window_Base[_0x15206c(0x1ea)][_0x15206c(0x15f)](),_0x375340=SceneManager[_0x15206c(0x239)]['_statusWindow'][_0x15206c(0x26c)]+Math[_0x15206c(0x1eb)](_0x5eddd4*0.5);this[_0x15206c(0x23f)]=0x0,this[_0x15206c(0x2b6)]=0x0;switch(_0x408bdd){case'top':this[_0x15206c(0x23f)]=Math['round'](Graphics[_0x15206c(0x2d5)]*0.5),this['_homeY']=0x60;break;case _0x15206c(0x2fc):this[_0x15206c(0x23f)]=Math[_0x15206c(0x1eb)](Graphics[_0x15206c(0x2d5)]*0.5),this[_0x15206c(0x2b6)]=Graphics[_0x15206c(0x23a)]-_0x375340;break;case'left':this['_homeX']=0x50,this[_0x15206c(0x2b6)]=Math[_0x15206c(0x1eb)]((Graphics['boxHeight']-_0x375340)/0x2);break;case _0x15206c(0x1f9):this[_0x15206c(0x23f)]=Graphics[_0x15206c(0x2d5)]-0x50,this[_0x15206c(0x2b6)]=Math[_0x15206c(0x1eb)]((Graphics['boxHeight']-_0x375340)/0x2);break;}this[_0x15206c(0x23f)]+=Sprite_FieldGaugeATB[_0x15206c(0xec)][_0x15206c(0x2ff)]||0x0,this[_0x15206c(0x2b6)]+=Sprite_FieldGaugeATB['Settings'][_0x15206c(0x116)]||0x0,this['x']=this['_homeX'],this['y']=this[_0x15206c(0x2b6)];},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)]['createChildren']=function(){const _0x1d5026=_0xc67d6b;this[_0x1d5026(0xf7)](),this[_0x1d5026(0x12a)](),this[_0x1d5026(0x1ca)]();},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0xf7)]=function(){const _0x314bef=_0xc67d6b;this[_0x314bef(0x222)]=new Sprite(),this[_0x314bef(0x222)][_0x314bef(0x1ad)]['x']=0.5,this[_0x314bef(0x222)]['anchor']['y']=0.5,this['addChild'](this[_0x314bef(0x222)]);const _0x2d37ce=Sprite_FieldGaugeATB['Settings'][_0x314bef(0x183)];if(_0x2d37ce)this[_0x314bef(0x222)][_0x314bef(0x166)]=ImageManager['loadSystem'](_0x2d37ce);},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x12a)]=function(){const _0x787200=_0xc67d6b;this['_gaugeSprite']=new Sprite(),this[_0x787200(0x129)](this[_0x787200(0x266)]),this[_0x787200(0x113)]();},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)]['createGaugeBitmap']=function(){const _0x328cdb=_0xc67d6b,_0x1a79c9=Sprite_FieldGaugeATB[_0x328cdb(0xec)],_0x3a1efd=this['isGaugeHorizontal'](),_0x718994=_0x3a1efd?_0x1a79c9[_0x328cdb(0x128)]:_0x1a79c9['GaugeThick'],_0x41b0c5=_0x3a1efd?_0x1a79c9[_0x328cdb(0x30b)]:_0x1a79c9[_0x328cdb(0x193)];this['_gaugeSprite'][_0x328cdb(0x166)]=new Bitmap(_0x718994,_0x41b0c5),this[_0x328cdb(0x280)](),this[_0x328cdb(0x266)]['x']=Math['ceil'](_0x718994/-0x2),this[_0x328cdb(0x266)]['y']=Math['ceil'](_0x41b0c5/-0x2);},Sprite_FieldGaugeATB['prototype'][_0xc67d6b(0x280)]=function(){const _0x12924e=_0xc67d6b;if(!Sprite_FieldGaugeATB[_0x12924e(0xec)]['DrawGauge'])return;const _0xa3a19e=Sprite_FieldGaugeATB[_0x12924e(0xec)],_0x571753=this[_0x12924e(0x266)]['bitmap'],_0x3b2435=_0x571753[_0x12924e(0x2a2)],_0x5ad2b9=_0x571753['height'],_0x1943b9=ColorManager[_0x12924e(0x22c)](),_0x1968f2=ColorManager['ctGaugeColor1'](),_0x2656d5=ColorManager['ctGaugeColor2'](),_0x25a7d1=ColorManager[_0x12924e(0x199)](_0x12924e(0x264)),_0x50f7f3=ColorManager[_0x12924e(0x199)](_0x12924e(0x1e5)),_0x14a9c4=this[_0x12924e(0x197)](),_0x2420f9=_0xa3a19e[_0x12924e(0x2f4)],_0x46a34e=_0xa3a19e['GaugeSplit'][_0x12924e(0x170)](0x0,0x1),_0x14a09b=Math[_0x12924e(0x268)](((_0x14a9c4?_0x3b2435:_0x5ad2b9)-0x2)*_0x46a34e);_0x571753['fillRect'](0x0,0x0,_0x3b2435,_0x5ad2b9,_0x1943b9);let _0x442a0c=0x0,_0x1d9948=0x0,_0x36d21d=0x0,_0x1607a1=0x0;if(_0x14a9c4&&_0x2420f9){if(_0x12924e(0x2d7)===_0x12924e(0x2d7))_0x442a0c=_0x14a09b-0x1,_0x36d21d=_0x3b2435-0x3-_0x442a0c,_0x571753[_0x12924e(0x2e9)](0x1,0x1,_0x442a0c,_0x5ad2b9-0x2,_0x1968f2,_0x2656d5,![]),_0x571753[_0x12924e(0x2e9)](0x2+_0x442a0c,0x1,_0x36d21d,_0x5ad2b9-0x2,_0x25a7d1,_0x50f7f3,![]);else{if(_0x587c7b!==_0x12924e(0x2d2))return!![];if(![_0x12924e(0x1ec),_0x12924e(0x146)]['includes'](this[_0x12924e(0x2fd)]['name']))return![];if(!_0x48cbf3[_0x12924e(0x2c6)]())return![];if(!_0x54770d['visualAtbGauge'])return![];return _0x2feb6b['BattleSystemATB'][_0x12924e(0xec)]['Gauge']['ShowStatusGauge'];}}else{if(_0x14a9c4&&!_0x2420f9)_0x12924e(0x12b)==='zHaxO'?(_0x442a0c=_0x14a09b-0x1,_0x36d21d=_0x3b2435-0x3-_0x442a0c,_0x571753[_0x12924e(0x2e9)](0x2+_0x36d21d,0x1,_0x442a0c,_0x5ad2b9-0x2,_0x1968f2,_0x2656d5,![]),_0x571753[_0x12924e(0x2e9)](0x1,0x1,_0x36d21d,_0x5ad2b9-0x2,_0x25a7d1,_0x50f7f3,![])):_0x43465d['BattleSystemATB'][_0x12924e(0x2f9)](_0x32431e,_0x3fb5b9);else{if(!_0x14a9c4&&_0x2420f9)_0x1d9948=_0x14a09b-0x1,_0x1607a1=_0x5ad2b9-0x3-_0x1d9948,_0x571753['gradientFillRect'](0x1,0x1,_0x3b2435-0x2,_0x1d9948,_0x1968f2,_0x2656d5,!![]),_0x571753['gradientFillRect'](0x1,0x2+_0x1d9948,_0x3b2435-0x2,_0x1607a1,_0x25a7d1,_0x50f7f3,!![]);else!_0x14a9c4&&!_0x2420f9&&(_0x1d9948=_0x14a09b-0x1,_0x1607a1=_0x5ad2b9-0x3-_0x1d9948,_0x571753[_0x12924e(0x2e9)](0x1,0x2+_0x1607a1,_0x3b2435-0x2,_0x1d9948,_0x1968f2,_0x2656d5,!![]),_0x571753[_0x12924e(0x2e9)](0x1,0x1,_0x3b2435-0x2,_0x1607a1,_0x25a7d1,_0x50f7f3,!![]));}}},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x1ca)]=function(){const _0x3368b7=_0xc67d6b;this[_0x3368b7(0x1ef)]&&this[_0x3368b7(0x266)][_0x3368b7(0x177)](this['_battlerContainer']),this['_battlerContainer']=new Sprite(),this['_gaugeSprite'][_0x3368b7(0x129)](this[_0x3368b7(0x1ef)]),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x200)]=function(){const _0x21c1f4=_0xc67d6b;this['createEnemySprites'](),this[_0x21c1f4(0x101)]();},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)]['createEnemySprites']=function(){const _0x564767=_0xc67d6b,_0x32f0a5=$gameTroop['members'](),_0x123c2c=_0x32f0a5[_0x564767(0x117)];for(let _0x926a6d=0x0;_0x926a6d<_0x123c2c;_0x926a6d++){_0x564767(0x12c)!=='gMNpJ'?this[_0x564767(0x141)](_0x926a6d,$gameTroop):_0x25e0af['y']+=_0x4b092e['gaugeHeight']()*_0x5655f0[_0x564767(0x2b5)]-0x1;}},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x101)]=function(){const _0x569af7=_0xc67d6b,_0x2a0817=$gameParty[_0x569af7(0x13c)]();for(let _0x1f0189=0x0;_0x1f0189<_0x2a0817;_0x1f0189++){if(_0x569af7(0x14c)==='YSluv')this[_0x569af7(0x141)](_0x1f0189,$gameParty);else return _0x5db999['x']-_0x36d1a2['x'];}},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x141)]=function(_0x152ba5,_0x530541){const _0x3b560a=_0xc67d6b,_0x2ab4a1=new Sprite_FieldMarkerATB(_0x152ba5,_0x530541,this[_0x3b560a(0x266)]);this[_0x3b560a(0x1ef)][_0x3b560a(0x129)](_0x2ab4a1);},Sprite_FieldGaugeATB['prototype'][_0xc67d6b(0x169)]=function(){const _0x153282=_0xc67d6b;Sprite[_0x153282(0x1ea)][_0x153282(0x169)][_0x153282(0x289)](this),this['updatePosition'](),this[_0x153282(0x277)](),this[_0x153282(0x227)]();},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)]['updatePosition']=function(){const _0x45df6b=_0xc67d6b,_0xb20f50=Sprite_FieldGaugeATB[_0x45df6b(0xec)];if(_0xb20f50[_0x45df6b(0x275)]!=='top')return;if(!_0xb20f50[_0x45df6b(0x19d)])return;const _0x5c1d0e=SceneManager['_scene'][_0x45df6b(0x28c)];if(!_0x5c1d0e)return;_0x5c1d0e[_0x45df6b(0x1d4)]?_0x45df6b(0x2ea)===_0x45df6b(0x162)?_0x4dd89d=_0x2b8366*_0x41e529:(this['x']=this[_0x45df6b(0x23f)]+(_0xb20f50['RepositionTopHelpX']||0x0),this['y']=this[_0x45df6b(0x2b6)]+(_0xb20f50['RepositionTopHelpY']||0x0)):(this['x']=this[_0x45df6b(0x23f)],this['y']=this[_0x45df6b(0x2b6)]);const _0x503b5a=SceneManager[_0x45df6b(0x239)][_0x45df6b(0x178)];this['x']+=_0x503b5a['x'],this['y']+=_0x503b5a['y'];},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x277)]=function(){const _0x3fb473=_0xc67d6b;if(!this[_0x3fb473(0x1ef)])return;const _0x32c221=this[_0x3fb473(0x1ef)]['children'];if(!_0x32c221)return;_0x32c221[_0x3fb473(0xe9)](this['compareBattlerSprites']['bind'](this));},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)]['compareBattlerSprites']=function(_0x5f3684,_0x31c2c8){const _0x42f238=_0xc67d6b,_0x4d8a89=this[_0x42f238(0x197)](),_0x184bf0=Sprite_FieldGaugeATB[_0x42f238(0xec)][_0x42f238(0x2f4)];if(_0x4d8a89&&_0x184bf0){if('ZdqFF'===_0x42f238(0x2e2))this['_battlerContainer']&&this[_0x42f238(0x266)][_0x42f238(0x177)](this[_0x42f238(0x1ef)]),this[_0x42f238(0x1ef)]=new _0x4e19c8(),this[_0x42f238(0x266)][_0x42f238(0x129)](this[_0x42f238(0x1ef)]),this[_0x42f238(0x200)]();else return _0x5f3684['x']-_0x31c2c8['x'];}else{if(_0x4d8a89&&!_0x184bf0){if('kFINh'!=='XewHQ')return _0x31c2c8['x']-_0x5f3684['x'];else{const _0x87235b=_0x40e9ec[_0x42f238(0x13c)]();for(let _0x4fb10e=0x0;_0x4fb10e<_0x87235b;_0x4fb10e++){this[_0x42f238(0x141)](_0x4fb10e,_0xffd63b);}}}else{if(!_0x4d8a89&&_0x184bf0){if(_0x42f238(0x1aa)!==_0x42f238(0x1aa))this[_0x42f238(0x134)]=_0x3ff526[_0x42f238(0x2c6)]();else return _0x5f3684['y']-_0x31c2c8['y'];}else{if(!_0x4d8a89&&!_0x184bf0)return _0x31c2c8['y']-_0x5f3684['y'];}}}},Sprite_FieldGaugeATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x227)]=function(){const _0x4953bb=_0xc67d6b;this['visible']=$gameSystem[_0x4953bb(0x2b0)]();};function Sprite_FieldMarkerATB(){const _0x27d0e0=_0xc67d6b;this[_0x27d0e0(0x1b6)](...arguments);}Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)]=Object[_0xc67d6b(0x1ae)](Sprite_Clickable[_0xc67d6b(0x1ea)]),Sprite_FieldMarkerATB['prototype']['constructor']=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)]['initialize']=function(_0x2c6b42,_0x380eb9,_0x22e283){const _0x57be18=_0xc67d6b;this[_0x57be18(0x13d)]=_0x2c6b42,this[_0x57be18(0x1c2)]=_0x380eb9,this[_0x57be18(0x266)]=_0x22e283,Sprite_Clickable[_0x57be18(0x1ea)][_0x57be18(0x1b6)][_0x57be18(0x289)](this),this[_0x57be18(0x243)](),this['createChildren'](),this[_0x57be18(0x306)]=this['targetOpacity']();},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x243)]=function(){const _0x14deda=_0xc67d6b;this[_0x14deda(0x1ad)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x1bb)]=function(){const _0x35b30d=_0xc67d6b;this[_0x35b30d(0x2af)](),this[_0x35b30d(0x217)](),this[_0x35b30d(0x1de)](),this[_0x35b30d(0x164)](),this[_0x35b30d(0x112)](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x2af)]=function(){const _0x57b96d=_0xc67d6b;if(!Sprite_FieldGaugeATB[_0x57b96d(0xec)]['ShowMarkerBg'])return;const _0x496b17=Sprite_FieldGaugeATB['Settings'],_0x1def20=this['_unit']===$gameParty?_0x57b96d(0x2e6):_0x57b96d(0x120),_0x22ff9e='%1SystemBg'[_0x57b96d(0x297)](_0x1def20),_0x4fbb2a=new Sprite();_0x4fbb2a[_0x57b96d(0x1ad)]['x']=this['anchor']['x'],_0x4fbb2a[_0x57b96d(0x1ad)]['y']=this[_0x57b96d(0x1ad)]['y'];if(_0x496b17[_0x22ff9e])_0x57b96d(0x210)===_0x57b96d(0x127)?this[_0x57b96d(0x136)]=this[_0x57b96d(0x219)]():_0x4fbb2a[_0x57b96d(0x166)]=ImageManager[_0x57b96d(0x1a1)](_0x496b17[_0x22ff9e]);else{const _0x2965ba=_0x496b17[_0x57b96d(0x213)];_0x4fbb2a[_0x57b96d(0x166)]=new Bitmap(_0x2965ba,_0x2965ba);const _0x46f967=ColorManager['getColor'](_0x496b17[_0x57b96d(0x1c0)[_0x57b96d(0x297)](_0x1def20)]),_0x379426=ColorManager[_0x57b96d(0xee)](_0x496b17[_0x57b96d(0x29c)['format'](_0x1def20)]);_0x4fbb2a['bitmap'][_0x57b96d(0x2e9)](0x0,0x0,_0x2965ba,_0x2965ba,_0x46f967,_0x379426,!![]);}this['_backgroundSprite']=_0x4fbb2a,this[_0x57b96d(0x129)](this[_0x57b96d(0x139)]),this[_0x57b96d(0x2a2)]=this[_0x57b96d(0x139)]['width'],this[_0x57b96d(0x26c)]=this[_0x57b96d(0x139)]['height'];},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x217)]=function(){const _0x1c0058=_0xc67d6b,_0x20c7df=new Sprite();_0x20c7df[_0x1c0058(0x1ad)]['x']=this[_0x1c0058(0x1ad)]['x'],_0x20c7df[_0x1c0058(0x1ad)]['y']=this[_0x1c0058(0x1ad)]['y'],this[_0x1c0058(0x25a)]=_0x20c7df,this['addChild'](this[_0x1c0058(0x25a)]),this[_0x1c0058(0x2cd)]();},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x1de)]=function(){const _0x261868=_0xc67d6b;if(!Sprite_FieldGaugeATB[_0x261868(0xec)]['ShowMarkerBorder'])return;const _0x174e0c=Sprite_FieldGaugeATB[_0x261868(0xec)],_0x313fd4=this[_0x261868(0x1c2)]===$gameParty?_0x261868(0x2e6):'Enemy',_0x2cd153='%1SystemBorder'[_0x261868(0x297)](_0x313fd4),_0x2b9ed0=new Sprite();_0x2b9ed0[_0x261868(0x1ad)]['x']=this['anchor']['x'],_0x2b9ed0['anchor']['y']=this[_0x261868(0x1ad)]['y'];if(_0x174e0c[_0x2cd153])_0x261868(0x288)===_0x261868(0x1dc)?_0x196948=0xa:_0x2b9ed0['bitmap']=ImageManager[_0x261868(0x1a1)](_0x174e0c[_0x2cd153]);else{let _0x5c12f4=_0x174e0c['MarkerSize'],_0x58a262=_0x174e0c[_0x261868(0x2cc)];_0x2b9ed0[_0x261868(0x166)]=new Bitmap(_0x5c12f4,_0x5c12f4);const _0x5e38d6=_0x261868(0x131),_0x10ce7c=ColorManager['getColor'](_0x174e0c[_0x261868(0x22e)['format'](_0x313fd4)]);_0x2b9ed0[_0x261868(0x166)][_0x261868(0x2c1)](0x0,0x0,_0x5c12f4,_0x5c12f4,_0x5e38d6),_0x5c12f4-=0x2,_0x2b9ed0[_0x261868(0x166)][_0x261868(0x2c1)](0x1,0x1,_0x5c12f4,_0x5c12f4,_0x10ce7c),_0x5c12f4-=_0x58a262*0x2,_0x2b9ed0['bitmap'][_0x261868(0x2c1)](0x1+_0x58a262,0x1+_0x58a262,_0x5c12f4,_0x5c12f4,_0x5e38d6),_0x5c12f4-=0x2,_0x58a262+=0x1,_0x2b9ed0[_0x261868(0x166)][_0x261868(0x226)](0x1+_0x58a262,0x1+_0x58a262,_0x5c12f4,_0x5c12f4);}this['_backgroundSprite']=_0x2b9ed0,this['addChild'](this[_0x261868(0x139)]);},Sprite_FieldMarkerATB['prototype']['createLetterSprite']=function(){const _0x2c518b=_0xc67d6b,_0x64a394=Sprite_FieldGaugeATB[_0x2c518b(0xec)];if(!_0x64a394['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x5470a5=_0x64a394[_0x2c518b(0x213)],_0x57d593=new Sprite();_0x57d593[_0x2c518b(0x1ad)]['x']=this[_0x2c518b(0x1ad)]['x'],_0x57d593[_0x2c518b(0x1ad)]['y']=this['anchor']['y'],_0x57d593[_0x2c518b(0x166)]=new Bitmap(_0x5470a5,_0x5470a5),this[_0x2c518b(0x1a5)]=_0x57d593,this[_0x2c518b(0x129)](this[_0x2c518b(0x1a5)]);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x112)]=function(){const _0x463f4e=_0xc67d6b,_0x3e4b2a=Sprite_FieldGaugeATB['Settings'];if(!_0x3e4b2a['ShowMarkerArrow'])return;const _0x5c3e25=new Sprite();_0x5c3e25[_0x463f4e(0x1ad)]['x']=this[_0x463f4e(0x1ad)]['x'],_0x5c3e25[_0x463f4e(0x1ad)]['y']=this[_0x463f4e(0x1ad)]['y'],this[_0x463f4e(0x2c4)](_0x5c3e25),this[_0x463f4e(0x2f8)]=_0x5c3e25,this[_0x463f4e(0x129)](this[_0x463f4e(0x2f8)]);},Sprite_FieldMarkerATB['prototype'][_0xc67d6b(0x2c4)]=function(_0x3de9c7){const _0x211c8c=_0xc67d6b,_0x2d64f0=Sprite_FieldGaugeATB[_0x211c8c(0xec)],_0x19dd0d=_0x2d64f0[_0x211c8c(0x213)],_0x6e6dfc=Math[_0x211c8c(0x1eb)](_0x19dd0d/0x2),_0x15e672=this[_0x211c8c(0x197)](),_0x5a9a48=this[_0x211c8c(0x1c2)]===$gameParty?_0x211c8c(0x2e6):_0x211c8c(0x120),_0x4f5971=_0x2d64f0['%1Side'['format'](_0x5a9a48)];_0x3de9c7[_0x211c8c(0x166)]=ImageManager[_0x211c8c(0x1a1)](_0x2d64f0[_0x211c8c(0x10e)]);const _0x503fc3=0x18,_0x51b3c9=_0x503fc3/0x2,_0x54acfb=0x60+_0x503fc3,_0x34fa5d=0x0+_0x503fc3;if(_0x15e672&&_0x4f5971)_0x3de9c7[_0x211c8c(0x20e)](_0x54acfb+_0x51b3c9,_0x34fa5d+_0x51b3c9+_0x503fc3,_0x503fc3,_0x51b3c9),_0x3de9c7['y']+=_0x6e6dfc,_0x3de9c7['anchor']['y']=0x0;else{if(_0x15e672&&!_0x4f5971)_0x3de9c7[_0x211c8c(0x20e)](_0x54acfb+_0x51b3c9,_0x34fa5d,_0x503fc3,_0x51b3c9),_0x3de9c7['y']-=_0x6e6dfc,_0x3de9c7[_0x211c8c(0x1ad)]['y']=0x1;else{if(!_0x15e672&&_0x4f5971)_0x3de9c7[_0x211c8c(0x20e)](_0x54acfb,_0x34fa5d+_0x51b3c9,_0x51b3c9,_0x503fc3),_0x3de9c7['x']-=Math[_0x211c8c(0x268)](_0x6e6dfc*1.75),_0x3de9c7[_0x211c8c(0x1ad)]['x']=0x0;else!_0x15e672&&!_0x4f5971&&(_0x3de9c7[_0x211c8c(0x20e)](_0x54acfb+_0x503fc3+_0x51b3c9,_0x34fa5d+_0x51b3c9,_0x51b3c9,_0x503fc3),_0x3de9c7['x']+=Math[_0x211c8c(0x268)](_0x6e6dfc*1.75),_0x3de9c7[_0x211c8c(0x1ad)]['x']=0x1);}}},Sprite_FieldMarkerATB['prototype'][_0xc67d6b(0x282)]=function(){const _0x26f844=_0xc67d6b;return this[_0x26f844(0x1c2)]===$gameParty?$gameParty[_0x26f844(0x254)]()[this[_0x26f844(0x13d)]]:$gameTroop[_0x26f844(0x274)]()[this['_index']];},Sprite_FieldMarkerATB['prototype']['update']=function(){const _0x17c257=_0xc67d6b;Sprite_Clickable[_0x17c257(0x1ea)]['update']['call'](this),this[_0x17c257(0x25d)](),this[_0x17c257(0x27b)](),this[_0x17c257(0x25f)](),this['updateGraphic'](),this[_0x17c257(0x10b)](),this[_0x17c257(0x1d5)](),this['updateSelectionEffect']();},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)]['updateOpacity']=function(){const _0x4e7262=_0xc67d6b,_0x5a7be2=this[_0x4e7262(0x203)](),_0x4ae5b2=Sprite_FieldGaugeATB[_0x4e7262(0xec)]['OpacityRate'];if(this[_0x4e7262(0x306)]>_0x5a7be2){if(_0x4e7262(0x138)==='oLGNY'){if(this['x']>_0x36a24f)this['x']=_0x318ac1[_0x4e7262(0x1be)](_0x6b96a,this['x']-_0x388c61);if(this['x']<_0x1f23a9)this['x']=_0x39f2d7[_0x4e7262(0x29b)](_0xaace62,this['x']+_0x4e9bdf);}else this[_0x4e7262(0x306)]=Math['max'](_0x5a7be2,this[_0x4e7262(0x306)]-_0x4ae5b2);}else this[_0x4e7262(0x306)]<_0x5a7be2&&(this[_0x4e7262(0x306)]=Math['min'](_0x5a7be2,this[_0x4e7262(0x306)]+_0x4ae5b2));},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x203)]=function(){const _0x2ac747=_0xc67d6b,_0x44e825=this['battler']();if(!_0x44e825)return 0x0;if(_0x44e825[_0x2ac747(0x1c7)]())return 0x0;if(_0x44e825['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x197)]=function(){const _0xab58ce=_0xc67d6b;if(this[_0xab58ce(0x269)]!==undefined)return this[_0xab58ce(0x269)];const _0x4d200f=Sprite_FieldGaugeATB[_0xab58ce(0xec)][_0xab58ce(0x275)];return this['_horz']=['top',_0xab58ce(0x2fc)][_0xab58ce(0x167)](_0x4d200f),this[_0xab58ce(0x269)];},Sprite_FieldMarkerATB['prototype'][_0xc67d6b(0x27b)]=function(){const _0x4ba001=_0xc67d6b,_0x2eb907=Sprite_FieldGaugeATB[_0x4ba001(0xec)],_0x413d2e=this[_0x4ba001(0x197)](),_0x875dbd=this[_0x4ba001(0x1c2)]===$gameParty?_0x4ba001(0x2e6):_0x4ba001(0x120),_0x45b2aa=_0x2eb907[_0x4ba001(0x28d)],_0x3b5172=_0x2eb907[_0x4ba001(0x2bc)['format'](_0x875dbd)];if(_0x413d2e){if(_0x4ba001(0x249)!==_0x4ba001(0x253))this['y']=_0x2eb907[_0x4ba001(0x30b)]/0x2,this['y']+=_0x3b5172?-_0x45b2aa:_0x45b2aa;else{if(!this[_0x4ba001(0x2ec)])return;const _0x4eb976=this[_0x4ba001(0x223)]&&this[_0x4ba001(0x223)][_0x4ba001(0x20a)]()&&!this[_0x4ba001(0x223)][_0x4ba001(0x1c7)]();this[_0x4ba001(0x2ec)][_0x4ba001(0x1d4)]=_0x4eb976,this[_0x4ba001(0x194)]&&this[_0x4ba001(0x194)]['_atbGaugeSprite']&&(this['_svBattlerSprite']['_atbGaugeSprite'][_0x4ba001(0x1d4)]=_0x4eb976);}}else this['x']=_0x2eb907['GaugeThick']/0x2,this['x']+=_0x3b5172?_0x45b2aa:-_0x45b2aa;},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x25f)]=function(_0xaedf31){const _0x2eaf01=_0xc67d6b,_0x534593=this[_0x2eaf01(0x282)]();if(!_0x534593)return;const _0x4eff15=Sprite_FieldGaugeATB[_0x2eaf01(0xec)],_0xfbd411=this[_0x2eaf01(0x197)](),_0x2829d0=this[_0x2eaf01(0x158)](),_0x3af8ef=_0xaedf31?Infinity:_0x4eff15[_0x2eaf01(0x11a)];if(_0xfbd411&&this['x']!==_0x2829d0){if(this['x']>_0x2829d0)this['x']=Math[_0x2eaf01(0x1be)](_0x2829d0,this['x']-_0x3af8ef);if(this['x']<_0x2829d0)this['x']=Math[_0x2eaf01(0x29b)](_0x2829d0,this['x']+_0x3af8ef);}else{if(!_0xfbd411&&this['x']!==_0x2829d0){if('eCBFo'!==_0x2eaf01(0x1b3)){if(this['y']>_0x2829d0)this['y']=Math['max'](_0x2829d0,this['y']-_0x3af8ef);if(this['y']<_0x2829d0)this['y']=Math[_0x2eaf01(0x29b)](_0x2829d0,this['y']+_0x3af8ef);}else return this[_0x2eaf01(0x2cd)]();}}},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x158)]=function(){const _0x2a25ca=_0xc67d6b,_0x36596d=Sprite_FieldGaugeATB['Settings'],_0x565762=this[_0x2a25ca(0x282)](),_0x3fe306=this[_0x2a25ca(0x197)](),_0x3422b8=this[_0x2a25ca(0x266)]['bitmap'][_0x2a25ca(0x2a2)],_0x54948c=this[_0x2a25ca(0x266)][_0x2a25ca(0x166)]['height'],_0x1a8db7=_0x36596d['GaugeSplit'][_0x2a25ca(0x170)](0x0,0x1),_0x472ba2=_0x36596d['GaugeDirection'];let _0x32a905=_0x565762[_0x2a25ca(0x240)]()*_0x1a8db7;_0x32a905+=(0x1-_0x1a8db7)*_0x565762[_0x2a25ca(0x256)]();if(_0x565762===BattleManager[_0x2a25ca(0x2e1)])_0x32a905=0x1;if(!_0x472ba2)_0x32a905=0x1-_0x32a905;let _0x3df420=0x0;if(_0x3fe306)_0x2a25ca(0x142)==='DfLya'?_0x3df420=_0x32a905*_0x3422b8:_0x377d22[_0x2a25ca(0x2df)]();else!_0x3fe306&&(_0x3df420=_0x32a905*_0x54948c);return Math['round'](_0x3df420);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x21e)]=function(){const _0x5ce646=_0xc67d6b,_0x31061c=this[_0x5ce646(0x282)]();if(!_0x31061c)return;const _0x3cafdc=Sprite_FieldGaugeATB[_0x5ce646(0xec)],_0x19bad8=this[_0x5ce646(0x1c2)]===$gameParty?_0x5ce646(0x2e6):_0x5ce646(0x120);let _0x55e0b9=_0x31061c[_0x5ce646(0x1e1)]();if(_0x31061c[_0x5ce646(0x28e)]()&&_0x55e0b9===_0x5ce646(0x1ce))_0x55e0b9=_0x5ce646(0x2dc);else _0x31061c[_0x5ce646(0x1a3)]()&&_0x55e0b9===_0x5ce646(0x190)&&(_0x55e0b9='enemy');if(this[_0x5ce646(0x147)]!==_0x55e0b9){if(_0x5ce646(0x2a7)===_0x5ce646(0x2a7))return this[_0x5ce646(0x2cd)]();else this[_0x5ce646(0x284)]=_0x5c6c8a[_0x5ce646(0x16e)](),_0x3f34a0=_0x181325[_0x5ce646(0x1af)](this['_graphicEnemy']),_0x3a621a[_0x5ce646(0x218)](this[_0x5ce646(0x171)][_0x5ce646(0x1e0)](this,_0x5bbd58));}switch(this['_graphicType']){case _0x5ce646(0x2dc):if(this[_0x5ce646(0x124)]!==_0x31061c[_0x5ce646(0x205)]())return this[_0x5ce646(0x2cd)]();if(this[_0x5ce646(0x189)]!==_0x31061c[_0x5ce646(0x2a3)]())return this[_0x5ce646(0x2cd)]();break;case _0x5ce646(0x2a1):if(this['_graphicIconIndex']!==_0x31061c['fieldAtbGraphicIconIndex']()){if(_0x5ce646(0x304)===_0x5ce646(0x304))return this['processUpdateGraphic']();else _0x37f742+=this[_0x5ce646(0x223)][_0x5ce646(0x2f2)]();}break;case _0x5ce646(0x1ce):if(_0x31061c[_0x5ce646(0x187)]()){if(this[_0x5ce646(0x149)]!==_0x31061c[_0x5ce646(0x1c4)]())return this[_0x5ce646(0x2cd)]();}else{if(this[_0x5ce646(0x284)]!==_0x31061c['battlerName']()){if(_0x5ce646(0x27c)!==_0x5ce646(0x27c)){const _0x57411d=this[_0x5ce646(0x203)](),_0x3491a1=_0x2bafac[_0x5ce646(0xec)]['OpacityRate'];if(this['opacity']>_0x57411d)this[_0x5ce646(0x306)]=_0x4399ab[_0x5ce646(0x1be)](_0x57411d,this['opacity']-_0x3491a1);else this[_0x5ce646(0x306)]<_0x57411d&&(this[_0x5ce646(0x306)]=_0x1366c4['min'](_0x57411d,this[_0x5ce646(0x306)]+_0x3491a1));}else return this[_0x5ce646(0x2cd)]();}}break;case'svactor':if(_0x31061c[_0x5ce646(0x28e)]()){if(_0x5ce646(0x13e)===_0x5ce646(0x30a))this[_0x5ce646(0x306)]=_0x40935d[_0x5ce646(0x29b)](_0x595e01,this[_0x5ce646(0x306)]+_0x3b8c18);else{if(this['_graphicSv']!==_0x31061c['battlerName']())return this[_0x5ce646(0x2cd)]();}}else{if(this[_0x5ce646(0x284)]!==_0x31061c[_0x5ce646(0x16e)]())return this[_0x5ce646(0x2cd)]();}break;}},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x2cd)]=function(){const _0xfd50ce=_0xc67d6b,_0x5609b6=this['battler']();if(!_0x5609b6)return;this[_0xfd50ce(0x147)]=_0x5609b6[_0xfd50ce(0x1e1)]();if(_0x5609b6[_0xfd50ce(0x28e)]()&&this[_0xfd50ce(0x147)]==='enemy')this['_graphicType']=_0xfd50ce(0x2dc);else{if(_0x5609b6[_0xfd50ce(0x1a3)]()&&this[_0xfd50ce(0x147)]===_0xfd50ce(0x190)){if(_0xfd50ce(0x2c8)!==_0xfd50ce(0x2fe))this[_0xfd50ce(0x147)]=_0xfd50ce(0x1ce);else{const _0x4c2290=_0x1713cf[_0xfd50ce(0x1ac)],_0x71f70f=_0xfd50ce(0x1ac);this[_0xfd50ce(0x1f3)](_0x4c2290,_0x71f70f);}}}let _0x703ef7;switch(this[_0xfd50ce(0x147)]){case _0xfd50ce(0x2dc):this[_0xfd50ce(0x124)]=_0x5609b6[_0xfd50ce(0x205)](),this[_0xfd50ce(0x189)]=_0x5609b6[_0xfd50ce(0x2a3)](),_0x703ef7=ImageManager[_0xfd50ce(0x17b)](this[_0xfd50ce(0x124)]),_0x703ef7[_0xfd50ce(0x218)](this[_0xfd50ce(0x2a5)][_0xfd50ce(0x1e0)](this,_0x703ef7));break;case'icon':this['_graphicIconIndex']=_0x5609b6[_0xfd50ce(0x1d1)](),_0x703ef7=ImageManager[_0xfd50ce(0x1a1)](_0xfd50ce(0x1da)),_0x703ef7[_0xfd50ce(0x218)](this[_0xfd50ce(0x25b)][_0xfd50ce(0x1e0)](this,_0x703ef7));break;case _0xfd50ce(0x1ce):if(_0x5609b6[_0xfd50ce(0x187)]())_0xfd50ce(0x206)===_0xfd50ce(0x1d8)?this[_0xfd50ce(0x2da)]():(this[_0xfd50ce(0x149)]=_0x5609b6[_0xfd50ce(0x1c4)](),_0x703ef7=ImageManager[_0xfd50ce(0x244)](this[_0xfd50ce(0x149)]),_0x703ef7[_0xfd50ce(0x218)](this['changeSvActorGraphicBitmap'][_0xfd50ce(0x1e0)](this,_0x703ef7)));else{if($gameSystem[_0xfd50ce(0x26a)]()){if(_0xfd50ce(0x260)===_0xfd50ce(0x13f)){if(this[_0xfd50ce(0x149)]!==_0x59a3c5[_0xfd50ce(0x16e)]())return this[_0xfd50ce(0x2cd)]();}else this[_0xfd50ce(0x284)]=_0x5609b6[_0xfd50ce(0x16e)](),_0x703ef7=ImageManager['loadSvEnemy'](this[_0xfd50ce(0x284)]),_0x703ef7[_0xfd50ce(0x218)](this[_0xfd50ce(0x171)]['bind'](this,_0x703ef7));}else this[_0xfd50ce(0x284)]=_0x5609b6[_0xfd50ce(0x16e)](),_0x703ef7=ImageManager[_0xfd50ce(0x114)](this['_graphicEnemy']),_0x703ef7['addLoadListener'](this[_0xfd50ce(0x171)][_0xfd50ce(0x1e0)](this,_0x703ef7));}break;case'svactor':this[_0xfd50ce(0x149)]=_0x5609b6['battlerName'](),_0x703ef7=ImageManager['loadSvActor'](this[_0xfd50ce(0x149)]),_0x703ef7[_0xfd50ce(0x218)](this[_0xfd50ce(0x2e4)][_0xfd50ce(0x1e0)](this,_0x703ef7));break;}},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)]['changeFaceGraphicBitmap']=function(_0x5c6029){const _0x3845b1=_0xc67d6b,_0x41ef99=Sprite_FieldGaugeATB[_0x3845b1(0xec)],_0x9bcbc7=_0x41ef99[_0x3845b1(0x213)],_0x1f3af8=this[_0x3845b1(0x189)];this[_0x3845b1(0x25a)][_0x3845b1(0x166)]=new Bitmap(_0x9bcbc7,_0x9bcbc7);const _0x4086a5=this[_0x3845b1(0x25a)][_0x3845b1(0x166)],_0x57747a=ImageManager['faceWidth'],_0x4e3d68=ImageManager[_0x3845b1(0x296)],_0x4b09b5=ImageManager[_0x3845b1(0xf9)],_0x9f999b=ImageManager[_0x3845b1(0x296)],_0x23be16=_0x1f3af8%0x4*_0x57747a+(_0x57747a-_0x4b09b5)/0x2,_0x349a45=Math[_0x3845b1(0x1b0)](_0x1f3af8/0x4)*_0x4e3d68+(_0x4e3d68-_0x9f999b)/0x2;_0x4086a5[_0x3845b1(0x1f6)](_0x5c6029,_0x23be16,_0x349a45,_0x4b09b5,_0x9f999b,0x0,0x0,_0x9bcbc7,_0x9bcbc7);},Sprite_FieldMarkerATB['prototype'][_0xc67d6b(0x25b)]=function(_0x2fd6da){const _0x4240c5=_0xc67d6b,_0x4fc19b=Sprite_FieldGaugeATB['Settings'],_0xcd733f=_0x4fc19b[_0x4240c5(0x213)],_0x3f0beb=this[_0x4240c5(0x10a)];this[_0x4240c5(0x25a)][_0x4240c5(0x166)]=new Bitmap(_0xcd733f,_0xcd733f);const _0x4a6fba=this['_graphicSprite'][_0x4240c5(0x166)],_0x3117a1=ImageManager[_0x4240c5(0x2ed)],_0x4f1545=ImageManager['iconHeight'],_0x44d29a=_0x3f0beb%0x10*_0x3117a1,_0x5a1e87=Math[_0x4240c5(0x1b0)](_0x3f0beb/0x10)*_0x4f1545;_0x4a6fba[_0x4240c5(0x1f6)](_0x2fd6da,_0x44d29a,_0x5a1e87,_0x3117a1,_0x4f1545,0x0,0x0,_0xcd733f,_0xcd733f);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x2e4)]=function(_0x5a7fbe){const _0x3ae799=_0xc67d6b,_0x303f4a=Sprite_FieldGaugeATB['Settings'],_0x29bd47=_0x303f4a['MarkerSize'];this['_graphicSprite'][_0x3ae799(0x166)]=new Bitmap(_0x29bd47,_0x29bd47);const _0x19588d=this['_graphicSprite'][_0x3ae799(0x166)],_0x181251=this['_graphicSv'][_0x3ae799(0x172)](/\$/i),_0x3f1e=_0x181251?0x1:ImageManager[_0x3ae799(0x121)],_0x356182=_0x181251?0x1:ImageManager[_0x3ae799(0x160)],_0x6a3190=_0x5a7fbe['width']/_0x3f1e,_0x598919=_0x5a7fbe[_0x3ae799(0x26c)]/_0x356182,_0x128050=Math['min'](0x1,_0x29bd47/_0x6a3190,_0x29bd47/_0x598919),_0x9a8671=_0x6a3190*_0x128050,_0x6a1336=_0x598919*_0x128050,_0x6229e3=Math['round']((_0x29bd47-_0x9a8671)/0x2),_0x1dd5ea=Math['round']((_0x29bd47-_0x6a1336)/0x2);_0x19588d[_0x3ae799(0x1f6)](_0x5a7fbe,0x0,0x0,_0x6a3190,_0x598919,_0x6229e3,_0x1dd5ea,_0x9a8671,_0x6a1336);},Sprite_FieldMarkerATB['prototype']['changeEnemyGraphicBitmap']=function(_0x2fa11e){const _0x4d5d64=_0xc67d6b,_0xc12bf2=Sprite_FieldGaugeATB[_0x4d5d64(0xec)],_0x5682e0=_0xc12bf2['MarkerSize'];this[_0x4d5d64(0x25a)][_0x4d5d64(0x166)]=new Bitmap(_0x5682e0,_0x5682e0);const _0x1c0ccb=this[_0x4d5d64(0x25a)][_0x4d5d64(0x166)],_0x1864dc=Math['min'](0x1,_0x5682e0/_0x2fa11e[_0x4d5d64(0x2a2)],_0x5682e0/_0x2fa11e[_0x4d5d64(0x26c)]),_0x4e05ed=_0x2fa11e[_0x4d5d64(0x2a2)]*_0x1864dc,_0x54efeb=_0x2fa11e['height']*_0x1864dc,_0xe64a3f=Math[_0x4d5d64(0x1eb)]((_0x5682e0-_0x4e05ed)/0x2),_0xca171c=Math[_0x4d5d64(0x1eb)]((_0x5682e0-_0x54efeb)/0x2);_0x1c0ccb['blt'](_0x2fa11e,0x0,0x0,_0x2fa11e[_0x4d5d64(0x2a2)],_0x2fa11e[_0x4d5d64(0x26c)],_0xe64a3f,_0xca171c,_0x4e05ed,_0x54efeb);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x10b)]=function(){const _0x3fdc1c=_0xc67d6b,_0x4bd8b1=this['battler']();if(!_0x4bd8b1)return;if(!_0x4bd8b1[_0x3fdc1c(0x1a3)]())return;if(this[_0x3fdc1c(0x258)]===_0x4bd8b1[_0x3fdc1c(0xe6)]())return;this['_graphicHue']=_0x4bd8b1[_0x3fdc1c(0xe6)](),this[_0x3fdc1c(0x25a)][_0x3fdc1c(0x103)](_0x4bd8b1[_0x3fdc1c(0x187)]()?0x0:this[_0x3fdc1c(0x258)]);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x1d5)]=function(){const _0x3657c3=_0xc67d6b;if(!this['_letterSprite'])return;const _0x2b5a4b=this[_0x3657c3(0x282)]();if(!_0x2b5a4b)return;if(this[_0x3657c3(0x272)]===_0x2b5a4b[_0x3657c3(0x272)]&&this['_plural']===_0x2b5a4b[_0x3657c3(0x2d8)])return;this[_0x3657c3(0x272)]=_0x2b5a4b[_0x3657c3(0x272)],this[_0x3657c3(0x2d8)]=_0x2b5a4b['_plural'];const _0x23c838=Sprite_FieldGaugeATB[_0x3657c3(0xec)],_0x131c4b=_0x23c838[_0x3657c3(0x213)],_0x360a7f=Math[_0x3657c3(0x1b0)](_0x131c4b/0x2),_0x5eaecf=this[_0x3657c3(0x1a5)]['bitmap'];_0x5eaecf[_0x3657c3(0x2ce)]();if(!this[_0x3657c3(0x2d8)])return;_0x5eaecf[_0x3657c3(0x2b4)]=_0x23c838[_0x3657c3(0x185)]||$gameSystem[_0x3657c3(0xe5)](),_0x5eaecf[_0x3657c3(0x1a6)]=_0x23c838['EnemyBattlerFontSize']||0x10,_0x5eaecf[_0x3657c3(0x104)](this[_0x3657c3(0x272)],0x2,_0x360a7f,_0x131c4b-0x4,_0x360a7f-0x2,'right');},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)][_0xc67d6b(0x235)]=function(){const _0x5b4573=_0xc67d6b,_0x180557=this[_0x5b4573(0x282)]();if(!_0x180557)return;const _0x4d2be4=_0x180557[_0x5b4573(0x282)]();if(!_0x4d2be4)return;const _0x4cdcd1=_0x4d2be4[_0x5b4573(0x1b1)]();if(!_0x4cdcd1)return;this['setBlendColor'](_0x4cdcd1['_blendColor']);},Sprite_FieldMarkerATB[_0xc67d6b(0x1ea)]['getStateTooltipBattler']=function(){return this['battler']();};