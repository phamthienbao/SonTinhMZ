//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.44] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.44: April 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x54bc45=_0x20bb;function _0x5c38(){const _0x89f95a=['Game_Battler_addDebuff','DBQYl','labelFontFace','getStypeIdWithName','VisuMZ_0_CoreEngine','groupDefeat','CmdWidth','MultiplierJS','call','tXjdS','eraseState','JTIkH','ELnJV','opacity','ReapplyRules','recoverAll','ePdVt','convertPassiveStates','onExpireDebuffJS','version','vEWKU','meetsStateCondition','addDebuffTurns','rgba(0,\x200,\x200,\x200)','nrdMw','isSkillHidden','bitmap','maxCols','ARRAYSTR','currentClass','clearStateOrigin','drawActorStateData','format','regenerateAll','gaugeRate','dLUfE','adjustSkillCost','skillCostSeparator','resetStateCounts','setActor','_subject','drawItemStyleIconText','Kuqmn','isActor','getSkillTypes','Mccwl','increaseBuff','meetsPassiveStateConditionSwitches','meetsSkillConditionsGlobalJS','DNlMW','Game_BattlerBase_refresh','onExpireBuffJS','inBattle','Game_BattlerBase_eraseState','_phase','uicQV','damage','ceil','Game_Battler_regenerateAll','SkillSceneAdjustSkillList','active','PassiveConditionJS','valueOutlineWidth','multiclasses','getColorDataFromPluginParameters','XoHmD','helpAreaHeight','setStateTurns','debuffTurns','getSkillIdWithName','_hidden','_lastStatesActionEndFrameCount','_currentActor','ValueOutlineSolid','Scene_Boot_onDatabaseLoaded','ihlmx','ParseStateNotetags','checkShowHideJS','buttonAssistSwitch','makeSuccess','LJqTx','tpCost','VsazY','13020tvVgfq','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','krkGZ','Ysssw','buffTurns','statusWindowRect','drawSkillCost','addPassiveStates','ZZtWI','Game_BattlerBase_increaseBuff','onEraseBuffGlobalJS','maxSlipDamage','commandStyle','forgetSkill','TVQZe','user','_stateOrigin','valueOutlineColor','StateTurnsActorChangeTo','helpWindowRectSkillsStatesCore','NUM','constructor','tXPin','updateStatesActionEnd','debuffColor','IgNyt','name','Gauge','isDebuffAffected','_stypeId','Game_Troop_setup','slipMp','prepareResetStateCounts','createTurnDisplaySprite','stateData','hrWBT','_classIDs','PLLxR','TurnFontSize','fontBold','VYmGU','_cache','stateMaximumTurns','onExpireDebuffGlobalJS','CheckVisibleSkillNotetags','convertTargetToStateOriginKey','updateCommandNameWindow','process_VisuMZ_SkillsStatesCore_Skill_Notetags','addPassiveStatesByPluginParameters','shift','ColorPositive','AJuHl','NBFbd','_skillIDs','makeCommandName','stateHpSlipDamageJS','passiveStates','isGroupDefeatStateAffected','Actor','changeOutlineColor','Game_BattlerBase_meetsSkillConditions','addState','ActorIDs','kdakQ','test','addBuff','canClearState','_stateIDs','fontSize','LabelOutlineWidth','endAction','XrMMp','ParseSkillNotetags','CalcJS','oIbsb','applyDebuffTurnManipulationEffects','buff','PCmZZ','text','onDatabaseLoaded','isStateCategoryResisted','Game_BattlerBase_skillMpCost','prototype','FUNC','reset','WPHLn','_result','Window_SkillList_maxCols','updateVisibility','2nwnnXp','ygaku','decreaseBuff','uiMenuStyle','status','_stateSteps','applyItemUserEffect','isBottomHelpMode','addPassiveStatesTraitSets','ARRAYJSON','SkillID','calcWindowHeight','Game_BattlerBase_initMembers','createKeyJS','aUAcD','clearStateData','hkSoK','LayoutStyle','categories','Sprite_Gauge_initMembers','removeStatesAuto','jGQSo','Game_Variables_onChange','priority','stateExpireJS','TSbwz','sort','stateEraseJS','ignore','YekuG','iconHeight','19510590zhXSNU','createShopStatusWindow','ookKl','isPlaytest','addChild','iconText','_skills','makeCommandList','allSwitchOff','StateTurnsEnemyChangeBy','slice','shopStatusWindowRectSkillsStatesCore','gAJfP','clearStateDisplay','drawExtendedSkillsStatesCoreStatus','getCurrentTroopUniqueID','Turns','ActionEndUpdate','isBuffAffected','switchConditions','removeStatesByCategory','XnntA','currentMaxValue','VOdsE','death','allIcons','Parse_Notetags_State_PassiveJS','textSizeEx','VisuMZ_1_ItemsEquipsCore','initMembersSkillsStatesCore','loadBitmap','contents','isLearnedSkill','drawActorIconsAllTurnCounters','EVAL','lJccj','process_VisuMZ_SkillsStatesCore_Notetags','_statusWindow','NmNlE','icon','meetsSkillConditions','updateFrame','onEraseStateJS','CheckVisibleSwitchNotetags','HKslY','Game_BattlerBase_skillTpCost','CmdStyle','meetsSkillConditionsEnableJS','_stateTurns','meetsPassiveStateConditions','isAllDead','floor','labelColor','none','redraw','Costs','DAKrS','boxWidth','_stored_debuffColor','ClatD','Window_SkillList_setActor','Tpqqa','RefreshCacheSwitch','lineHeight','setupSkillsStatesCore','SMYhJ','185sNRckG','GaugeCurrentJS','note','isSkillUsableForAutoBattle','addDebuff','_stypeIDs','canPaySkillCost','updateStateTurns','Game_Action_applyItemUserEffect','VzUdA','createCommandNameWindow','_stateMaxTurns','BattleManager_endAction','AcTLZ','allowCreateShopStatusWindow','Window_SkillList_updateHelp','Game_BattlerBase_resetStateCounts','statusWindowRectSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Buffs','Qqmvn','removeState','getPassiveStatesFromObj','totalStateCategory','Game_BattlerBase_traitsSet','setup','stateMpSlipHealJS','nFTTE','KhcAD','enemy','Game_Actor_skillTypes','commandName','OVGww','sPXEb','mainAreaHeight','registerCommand','CoreEngine','KuSaI','exit','oyUoP','labelOutlineWidth','onAddStateMakeCustomSlipValues','_categoryWindow','stateMpSlipDamageJS','commandNameWindowDrawText','PjusU','onAddDebuff','WJJlN','Global','itemTextAlign','_scene','ValueFontMainType','commandStyleCheck','ttNRs','applyStateCategoryRemovalEffects','clearStateRetainType','itemAt','getCurrentStateOriginKey','checkSkillConditionsNotetags','whtLB','blkLM','lnqPa','skillMpCost','onExpireBuff','Sprite_Gauge_redraw','initialize','addPassiveStatesFromOtherPlugins','States','SkillsStatesCore','_buffs','DAbwl','drawIcon','GaugeMaxJS','Game_Actor_learnSkill','isBuffOrDebuffAffected','TurnOffsetY','fontFace','<enemy-%1>','shopStatusWidth','skill','kKlCs','vaKtF','isSkillCostShown','KzyiV','XIBJB','drawTextEx','qzLKI','actor','MaxTurns','hasSkill','Game_Action_testApply','valueFontFace','testSkillStatesCoreNotetags','sQjOg','numberFontFace','MatchLabelGaugeColor','_stateData','Urzfn','outlineColor','auto','gradientFillRect','AutoAddState','uiInputPosition','add','dlvdr','states','pZwwq','uityr','snpRI','getStateReapplyRulings','DataFontSize','Game_BattlerBase_decreaseBuff','onEraseDebuffJS','Sprite_Gauge_setup','uaWqC','frameCount','isSkillTypeMatchForUse','BcPbj','SkillSceneStatusBgType','JqrPn','ZxDXf','%1%','4302784wDenXp','allSwitchOn','onAddStateJS','mainCommandWidth','isStateExpired','state','setItem','Game_BattlerBase_recoverAll','mainFontSize','setStypeId','skillTypes','Parse_Notetags_State_Category','skillTpCost','AsOOH','RZXzY','keys','Scene_Skill_statusWindowRect','gaugeBackColor','skillEnableJS','_passiveStateResults','meetsPassiveStateConditionJS','stateTpSlipDamageJS','SkillMenuStatusRect','vGykv','Parse_Notetags_State_ApplyRemoveLeaveJS','statusWidth','hasState','removeOtherStatesOfSameCategory','onAddState','ARRAYNUM','valueFontSize','paramValueByName','filter','updatedLayoutStyle','_cache_getPassiveStatesFromObj','OMrmv','onEraseDebuffGlobalJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_tempActor','slipTp','stateAddJS','isStateAddable','Skills','removeStatesByCategoryAll','NtZwU','isUseSkillsStatesCoreUpdatedLayout','stateTpSlipHealJS','mainFontFace','clear','Game_Battler_isStateAddable','allBattleMembers','iconWidth','_costSettings','USEjz','MJXiY','paramBuffRate','Param','updateHelp','STRUCT','StackBuffMax','setDebuffTurns','totalStateCategoryAffected','setStateRetainType','ColorDebuff','PoWjA','deadMembers','map','mpDamage','vKkAC','recover\x20all','_actor','_checkingVisuMzPassiveStateObjects','number','JlDbO','center','Name','_checkingPassiveStates','untitled','StateID','onRegenerateCustomStateDamageOverTime','isStateCategoryAffected','vMXRK','learnSkill','redrawSkillsStatesCore','kMJWF','labelFontSize','gainHp','ValueOutlineWidth','lfAIc','toLowerCase','applySkillsStatesCoreEffects','RcwAk','rzGMR','RUkQh','process_VisuMZ_SkillsStatesCore_State_Notetags','IIoyV','fHpXH','2883960JMCcXH','CheckVisibleBattleNotetags','Window_StatusBase_placeGauge','VYvii','Game_Unit_deadMembers','MDF','clearStates','ParseClassIDs','Window_StatusBase_drawActorIcons','GGXxZ','isStateAffected','Sprite_Gauge_currentMaxValue','_tempBattler','DMdfB','drawActorIcons','lcSPQ','ARRAYSTRUCT','isPassiveStateStackable','members','HsySC','TurnOffsetX','height','Window_SkillList_drawItem','dmKZH','addWindow','width','ListWindowCols','onEraseStateGlobalJS','Yfhnd','stateHpSlipHealJS','STR','MAXMP','isStateResist','actions','stypeId','buttonAssistText1','round','onExpireDebuff','JbnoE','XdlUK','right','buffIconIndex','placeGauge','_turnDisplaySprite','_skillTypeWindow','gaugeColor1','PassiveStates','WxJTp','windowPadding','_currentTroopUniqueID','Parse_Notetags_Skill_Cost','wAJFF','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_animationIndex','CyGYM','Actor-%1-%2','fiVel','getStateIdWithName','isMaxDebuffAffected','YzDNt','_buffTurns','eraseBuff','retrieveStateColor','index','getStateDisplay','initMembers','IconStypeMagic','Skill-%1-%2','Parse_Notetags_State_SlipEffectJS','onEraseStateCustomJS','item','createPassiveStatesCache','aQWDP','_cache_getPassiveStateConditionSwitchData','_stateRetainType','includesSkillsStatesCore','slipHp','gainSilentTp','cNrub','success','indexOf','NNrBb','PresetLabelGaugeColor','normalColor','AGI','itemWindowRect','recalculateSlipDamageJS','onBattleEnd','traitsSet','addPassiveStatesByNotetag','\x5cI[%1]%2','isStateRemoved','RtAFw','ConvertParams','uMDDG','onAddStateCustomJS','parse','ShowTurns','Window_SkillStatus_refresh','onExpireStateJS','ARRAYFUNC','uiHelpPosition','getStateOriginByKey','ALL','magicSkills','LabelFontMainType','split','lfRNr','1477215YRBusO','JSON','VisuMZ_1_MainMenuCore','setStateOrigin','rgba(0,\x200,\x200,\x201)','onEraseDebuff','includes','statesByCategory','ONQnY','drawItem','wcEUz','Armor-%1-%2','drawActorBuffTurns','DfVlT','MVTih','CmdTextAlign','onAddDebuffGlobalJS','Game_Unit_isAllDead','CheckIncompatibleStates','eGhSR','getStateData','uPQzH','autoRemovalTiming','_battler','trim','bYxTQ','WGInT','yAGZg','isBuffPrevented','clamp','onRemoveState','stateTurns','dpHdY','DataOffsetX','gaugeColor2','refresh','Game_BattlerBase_die','clearAllStateOrigins','VtcHs','onEraseBuff','checkShowHideNotetags','rdnrR','buffColor','uiHhC','Scene_Skill_skillTypeWindowRect','passiveStateObjects','hISoW','syfoQ','testApply','changeTextColor','currentValueSkillsStatesCore','createAllSkillCostText','checkSkillConditionsSwitchNotetags','currentValue','ParseAllNotetags','match','<member-%1>','jRIXx','makeCurrentTroopUniqueID','Game_BattlerBase_overwriteBuffTurns','jgjvc','%1\x20%2\x20%3','gbOMR','KFFWr','greater','LabelOutlineSolid','applyStateTurnManipulationEffects','getColor','enemyId','max','Game_Switches_onChange','_stateDisplay','onExpireState','onAddBuffGlobalJS','DataOffsetY','KiZrt','makeAdditionalSkillCostText','BGYbq','onExpireStateGlobalJS','skillTypeWindowRect','Scene_Skill_itemWindowRect','isRightInputMode','kiFzv','isPartyAllAffectedByGroupDefeatStates','_shopStatusWindow','usableSkills','textColor','clearStatesWithStateRetain','Window_SkillList_includes','PayJS','MatchLabelColor','isStateRestrict','onChange','StateTurnsEnemyChangeTo','action','addBuffTurns','createSkillCostText','TTIQp','<troop-%1>','skillVisibleJS','drawExtendedParameter','anySwitchOn','lgZWI','equips','setStateDisplay','stateId','NHaRp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onExpireStateCustomJS','rfyxf','placeExactGauge','overwriteBuffTurns','JcCmC','Game_Battler_addBuff','KRVpi','fillRect','RnAwg','CanPayJS','stateColor','isBuffExpired','QfQcT','mainAreaTop','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','iconIndex','NjKrx','YHIyU','ShowShopStatus','anySwitchOff','push','Game_BattlerBase_isStateResist','<actor-%1>','_stored_buffColor','_states','currentDisplayedValue','State-%1-%2','skillTypeWindowRectSkillsStatesCore','replace','LkcTo','Game_Battler_onBattleEnd','Enemy-%1-%2','addStateTurns','VisuMZ_1_ElementStatusCore','PuYrD','EnableLayout','isMaxBuffAffected','spLqg','eyZDN','isAlive','tMIST','removeBuff','innerWidth','drawItemStyleIcon','addCommand','rkYWO','useDigitGrouping','MyjvU','checkCacheKey','log','meetsPassiveStateConditionClasses','skillId','onAddStateGlobalJS','isUseModernControls','getClassIdWithName','remove','_colorCache','ijhTS','setBuffTurns','setPassiveStateSlipDamageJS','adjustItemWidthByShopStatus','heal','drawActorStateTurns','HiddenSkillTypes','isSceneBattle','parameters','Window_SkillType_initialize','mpCost','meetsPassiveStateGlobalConditionJS','checkSkillTypeMatch','getCurrentStateActiveUser','LUK','callUpdateHelp','_commandNameWindow','MAXHP','geTnb','1594744dCLJNp','restriction','ShowData','_checkingTraitsSetSkillsStatesCore','Sprite_Gauge_currentValue','QbGxr','getStateRetainType','skills','_stored_state-%1-color','length','die','helpWindowRect','itemLineRect','Scene_Skill_helpWindowRect','ZCzwx','helpAreaTop','DEF','_itemWindow','aIaWa','toUpperCase','gainMp','Enemy','MAT','Game_BattlerBase_clearStates','description','POSITIVE','#%1','drawText','DisplayedParams','PpSTX','Parse_Notetags_Skill_JS','Settings','onEraseBuffJS','shopStatusWindowRect','resetFontSettings','RuvLv','setStatusWindow','concat','currentMaxValueSkillsStatesCore','LKWRk','576274Bxeyjc','anchor','DpuHC','Class-%1-%2','updateTurnDisplaySprite','regenerateAllSkillsStatesCore','SxpSu','_endingBattle','traitObjects','BUICQ','labelOutlineColor','ZcGQM','paySkillCost','Sprite_StateIcon_updateFrame','bXXXm','alterSkillName','oAwjY','onExpireBuffGlobalJS','drawFullGauge','onAddBuff','Sprite_Gauge_gaugeRate','EjDIr','value','HepXV','setBackgroundType','ATK','Game_Actor_forgetSkill','changePaintOpacity','7CPAIzn','Game_BattlerBase_buffIconIndex','resetTextColor','yIAPA','geXKl','ColorNeutral','RmFYd','Scene_Skill_createItemWindow','Game_BattlerBase_eraseBuff','drawActorBuffRates','gaugeLineHeight','iKJiV'];_0x5c38=function(){return _0x89f95a;};return _0x5c38();}(function(_0x2039ae,_0x1ac18f){const _0x414af5=_0x20bb,_0x4b015a=_0x2039ae();while(!![]){try{const _0x1b62ff=-parseInt(_0x414af5(0x432))/0x1*(-parseInt(_0x414af5(0x506))/0x2)+parseInt(_0x414af5(0x352))/0x3+parseInt(_0x414af5(0x40a))/0x4+parseInt(_0x414af5(0x20b))/0x5*(-parseInt(_0x414af5(0x4ad))/0x6)+-parseInt(_0x414af5(0x44e))/0x7*(-parseInt(_0x414af5(0x285))/0x8)+parseInt(_0x414af5(0x2e6))/0x9+-parseInt(_0x414af5(0x525))/0xa;if(_0x1b62ff===_0x1ac18f)break;else _0x4b015a['push'](_0x4b015a['shift']());}catch(_0x522c76){_0x4b015a['push'](_0x4b015a['shift']());}}}(_0x5c38,0x47da0));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x34a6e8){const _0x2ebcff=_0x20bb;return _0x34a6e8[_0x2ebcff(0x50a)]&&_0x34a6e8[_0x2ebcff(0x422)][_0x2ebcff(0x358)]('['+label+']');})[0x0];function _0x20bb(_0xcd9f44,_0x5107e9){const _0x5c38e7=_0x5c38();return _0x20bb=function(_0x20bb9b,_0x2b48d9){_0x20bb9b=_0x20bb9b-0x1da;let _0x2c51d9=_0x5c38e7[_0x20bb9b];return _0x2c51d9;},_0x20bb(_0xcd9f44,_0x5107e9);}VisuMZ[label][_0x54bc45(0x429)]=VisuMZ[label][_0x54bc45(0x429)]||{},VisuMZ[_0x54bc45(0x343)]=function(_0x1ad378,_0x2f3d36){const _0x49a699=_0x54bc45;for(const _0x1a9465 in _0x2f3d36){if(_0x1a9465[_0x49a699(0x389)](/(.*):(.*)/i)){const _0x416e94=String(RegExp['$1']),_0x3c86b3=String(RegExp['$2'])[_0x49a699(0x41d)]()['trim']();let _0x3529a5,_0x422e11,_0xccc725;switch(_0x3c86b3){case _0x49a699(0x4c1):_0x3529a5=_0x2f3d36[_0x1a9465]!==''?Number(_0x2f3d36[_0x1a9465]):0x0;break;case _0x49a699(0x2a2):_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11[_0x49a699(0x2c7)](_0xdbdf1=>Number(_0xdbdf1));break;case _0x49a699(0x1eb):_0x3529a5=_0x2f3d36[_0x1a9465]!==''?eval(_0x2f3d36[_0x1a9465]):null;break;case'ARRAYEVAL':_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11['map'](_0xa8c0a3=>eval(_0xa8c0a3));break;case _0x49a699(0x353):_0x3529a5=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):'';break;case _0x49a699(0x50f):_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11[_0x49a699(0x2c7)](_0x17e165=>JSON['parse'](_0x17e165));break;case _0x49a699(0x500):_0x3529a5=_0x2f3d36[_0x1a9465]!==''?new Function(JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465])):new Function('return\x200');break;case _0x49a699(0x34a):_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11[_0x49a699(0x2c7)](_0x273059=>new Function(JSON['parse'](_0x273059)));break;case _0x49a699(0x304):_0x3529a5=_0x2f3d36[_0x1a9465]!==''?String(_0x2f3d36[_0x1a9465]):'';break;case _0x49a699(0x476):_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11[_0x49a699(0x2c7)](_0x4a80fc=>String(_0x4a80fc));break;case _0x49a699(0x2bf):_0xccc725=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):{},_0x1ad378[_0x416e94]={},VisuMZ['ConvertParams'](_0x1ad378[_0x416e94],_0xccc725);continue;case _0x49a699(0x2f6):_0x422e11=_0x2f3d36[_0x1a9465]!==''?JSON[_0x49a699(0x346)](_0x2f3d36[_0x1a9465]):[],_0x3529a5=_0x422e11[_0x49a699(0x2c7)](_0x3e480c=>VisuMZ[_0x49a699(0x343)]({},JSON['parse'](_0x3e480c)));break;default:continue;}_0x1ad378[_0x416e94]=_0x3529a5;}}return _0x1ad378;},(_0x350193=>{const _0x2b663e=_0x54bc45,_0x46f2c4=_0x350193[_0x2b663e(0x4c7)];for(const _0x8ab2b4 of dependencies){if('ZxDXf'!==_0x2b663e(0x283))return this['skillTypeWindowRectSkillsStatesCore']();else{if(!Imported[_0x8ab2b4]){alert(_0x2b663e(0x3bd)[_0x2b663e(0x47a)](_0x46f2c4,_0x8ab2b4)),SceneManager[_0x2b663e(0x231)]();break;}}}const _0x1b9488=_0x350193[_0x2b663e(0x422)];if(_0x1b9488['match'](/\[Version[ ](.*?)\]/i)){const _0x496e4d=Number(RegExp['$1']);_0x496e4d!==VisuMZ[label][_0x2b663e(0x46d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x46f2c4,_0x496e4d)),SceneManager['exit']());}if(_0x1b9488[_0x2b663e(0x389)](/\[Tier[ ](\d+)\]/i)){if('ELnJV'===_0x2b663e(0x466)){const _0x38d0fb=Number(RegExp['$1']);_0x38d0fb<tier?(alert(_0x2b663e(0x4ae)[_0x2b663e(0x47a)](_0x46f2c4,_0x38d0fb,tier)),SceneManager[_0x2b663e(0x231)]()):_0x2b663e(0x459)!==_0x2b663e(0x459)?(_0x4f3825[_0x2b663e(0x4ff)][_0x2b663e(0x3fc)][_0x2b663e(0x462)](this,_0x446856,_0x4c9c9f,0x0,0x0),_0x555a78['prototype'][_0x2b663e(0x479)][_0x2b663e(0x462)](this,_0x2afc51,_0x52250a,0x0,0x0)):tier=Math['max'](_0x38d0fb,tier);}else{const _0x3e528e=this['statesByCategory'](_0x53fae9)['filter'](_0x49b200=>this[_0x2b663e(0x2f0)](_0x49b200['id']));return _0x3e528e[_0x2b663e(0x413)];}}VisuMZ[_0x2b663e(0x343)](VisuMZ[label][_0x2b663e(0x429)],_0x350193[_0x2b663e(0x3ff)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'SkillActorPaySkillCost',_0x39a393=>{const _0x9e6d9=_0x54bc45;VisuMZ[_0x9e6d9(0x343)](_0x39a393,_0x39a393);const _0xfbfc4=_0x39a393[_0x9e6d9(0x4eb)]||[],_0x336b9e=Number(_0x39a393['SkillID']),_0x37f899=$dataSkills[_0x336b9e];if(!_0x37f899)return;for(const _0x57b95a of _0xfbfc4){if(_0x9e6d9(0x531)===_0x9e6d9(0x531)){const _0x50895e=$gameActors[_0x9e6d9(0x262)](_0x57b95a);if(!_0x50895e)continue;_0x50895e[_0x9e6d9(0x43e)](_0x37f899);}else return this[_0x9e6d9(0x235)]&&this[_0x9e6d9(0x235)]['isUseModernControls']();}}),PluginManager[_0x54bc45(0x22e)](pluginData['name'],'SkillEnemyPaySkillCost',_0x33844a=>{const _0x1712d9=_0x54bc45;VisuMZ[_0x1712d9(0x343)](_0x33844a,_0x33844a);const _0x113d19=_0x33844a['EnemyIndex']||[],_0x386c9c=Number(_0x33844a[_0x1712d9(0x510)]),_0x58a3a9=$dataSkills[_0x386c9c];if(!_0x58a3a9)return;for(const _0x1210b4 of _0x113d19){if(_0x1712d9(0x46e)==='kYQwL')return _0x1e634f[_0x1712d9(0x1e5)]?_0x2c2f6f[_0x1712d9(0x4ff)][_0x1712d9(0x29e)]():0x0;else{const _0x17b330=$gameTroop[_0x1712d9(0x2f8)]()[_0x1210b4];if(!_0x17b330)continue;_0x17b330[_0x1712d9(0x43e)](_0x58a3a9);}}}),PluginManager['registerCommand'](pluginData['name'],'StateTurnsActorChangeBy',_0x1694aa=>{const _0x4aa7a4=_0x54bc45;VisuMZ[_0x4aa7a4(0x343)](_0x1694aa,_0x1694aa);const _0xc64f6a=_0x1694aa[_0x4aa7a4(0x4eb)]||[],_0x3245bf=Number(_0x1694aa[_0x4aa7a4(0x2d3)]),_0x3f531e=Number(_0x1694aa[_0x4aa7a4(0x535)]),_0x11bf14=_0x1694aa[_0x4aa7a4(0x270)];for(const _0x468e74 of _0xc64f6a){const _0x3c72fa=$gameActors[_0x4aa7a4(0x262)](_0x468e74);if(!_0x3c72fa)continue;if(_0x11bf14&&!_0x3c72fa[_0x4aa7a4(0x2f0)](_0x3245bf)){if(_0x4aa7a4(0x2e4)===_0x4aa7a4(0x3db))return _0x1035ee[_0x4aa7a4(0x24f)][_0x4aa7a4(0x429)]['States'][_0x4aa7a4(0x468)];else _0x3c72fa[_0x4aa7a4(0x4ea)](_0x3245bf),_0x3c72fa[_0x4aa7a4(0x49d)](_0x3245bf,_0x3f531e);}else _0x4aa7a4(0x25f)!=='XIBJB'?(_0x5dbc79[_0x4aa7a4(0x24f)]['Scene_Skill_createItemWindow'][_0x4aa7a4(0x462)](this),this[_0x4aa7a4(0x219)]()&&this['createShopStatusWindow']()):_0x3c72fa[_0x4aa7a4(0x3de)](_0x3245bf,_0x3f531e);}}),PluginManager[_0x54bc45(0x22e)](pluginData[_0x54bc45(0x4c7)],_0x54bc45(0x4bf),_0x19d076=>{const _0x1b17d8=_0x54bc45;VisuMZ[_0x1b17d8(0x343)](_0x19d076,_0x19d076);const _0x2e4389=_0x19d076[_0x1b17d8(0x4eb)]||[],_0x864a62=Number(_0x19d076['StateID']),_0x5ae78a=Math[_0x1b17d8(0x397)](Number(_0x19d076[_0x1b17d8(0x535)]),0x0),_0x437b6c=_0x19d076[_0x1b17d8(0x270)];for(const _0x3eea95 of _0x2e4389){const _0x5a787d=$gameActors[_0x1b17d8(0x262)](_0x3eea95);if(!_0x5a787d)continue;_0x437b6c&&!_0x5a787d[_0x1b17d8(0x2f0)](_0x864a62)&&(_0x1b17d8(0x381)!==_0x1b17d8(0x381)?this[_0x1b17d8(0x4bd)]={}:_0x5a787d[_0x1b17d8(0x4ea)](_0x864a62)),_0x5a787d[_0x1b17d8(0x49d)](_0x864a62,_0x5ae78a);}}),PluginManager[_0x54bc45(0x22e)](pluginData[_0x54bc45(0x4c7)],_0x54bc45(0x52e),_0x2dc8df=>{const _0x255315=_0x54bc45;if(!$gameParty[_0x255315(0x48e)]())return;VisuMZ[_0x255315(0x343)](_0x2dc8df,_0x2dc8df);const _0x420253=_0x2dc8df['EnemyIndex']||[],_0x5d3ba7=Number(_0x2dc8df['StateID']),_0x384126=Number(_0x2dc8df[_0x255315(0x535)]),_0x323039=_0x2dc8df[_0x255315(0x270)];for(const _0x5aeae5 of _0x420253){if('PqIRW'!==_0x255315(0x3b8)){const _0xf0365a=$gameTroop[_0x255315(0x2f8)]()[_0x5aeae5];if(!_0xf0365a)continue;if(_0x323039&&!_0xf0365a[_0x255315(0x2f0)](_0x5d3ba7)){if(_0x255315(0x2bb)!=='Dfayb')_0xf0365a[_0x255315(0x4ea)](_0x5d3ba7),_0xf0365a[_0x255315(0x49d)](_0x5d3ba7,_0x384126);else{if(_0x26776d['isLearnedSkill'](_0x3f0848))return![];}}else{if(_0x255315(0x3ca)!==_0x255315(0x3ca))return _0x255315(0x356);else _0xf0365a[_0x255315(0x3de)](_0x5d3ba7,_0x384126);}}else _0x269ee8+=this[_0x255315(0x4b1)](_0x6a376d),this[_0x255315(0x3f8)](_0x112d4e,_0x27ee72);}}),PluginManager[_0x54bc45(0x22e)](pluginData[_0x54bc45(0x4c7)],_0x54bc45(0x3af),_0x4abad5=>{const _0x137fe5=_0x54bc45;if(!$gameParty[_0x137fe5(0x48e)]())return;VisuMZ[_0x137fe5(0x343)](_0x4abad5,_0x4abad5);const _0x3dba11=_0x4abad5['EnemyIndex']||[],_0x4682d8=Number(_0x4abad5['StateID']),_0x3020ed=Math[_0x137fe5(0x397)](Number(_0x4abad5['Turns']),0x0),_0xf154c=_0x4abad5[_0x137fe5(0x270)];for(const _0x2ecc59 of _0x3dba11){const _0xda7e76=$gameTroop[_0x137fe5(0x2f8)]()[_0x2ecc59];if(!_0xda7e76)continue;if(_0xf154c&&!_0xda7e76[_0x137fe5(0x2f0)](_0x4682d8)){if(_0x137fe5(0x4af)===_0x137fe5(0x4af))_0xda7e76[_0x137fe5(0x4ea)](_0x4682d8);else{if(!this[_0x137fe5(0x40d)])this[_0x137fe5(0x375)]();this[_0x137fe5(0x32d)]();}}_0xda7e76[_0x137fe5(0x49d)](_0x4682d8,_0x3020ed);}}),VisuMZ[_0x54bc45(0x24f)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x54bc45(0x4ff)][_0x54bc45(0x4fc)],Scene_Boot['prototype'][_0x54bc45(0x4fc)]=function(){const _0x26bd5d=_0x54bc45;VisuMZ[_0x26bd5d(0x24f)][_0x26bd5d(0x4a4)]['call'](this),this[_0x26bd5d(0x1ed)](),VisuMZ[_0x26bd5d(0x24f)][_0x26bd5d(0x364)]();},Scene_Boot[_0x54bc45(0x4ff)][_0x54bc45(0x1ed)]=function(){const _0x3735b0=_0x54bc45;if(VisuMZ[_0x3735b0(0x388)])return;this[_0x3735b0(0x4dc)](),this[_0x3735b0(0x2e3)]();},Scene_Boot['prototype'][_0x54bc45(0x4dc)]=function(){const _0x1e4ac3=_0x54bc45;for(const _0x4efa0b of $dataSkills){if(_0x1e4ac3(0x4d2)===_0x1e4ac3(0x4d2)){if(!_0x4efa0b)continue;VisuMZ[_0x1e4ac3(0x24f)][_0x1e4ac3(0x318)](_0x4efa0b),VisuMZ['SkillsStatesCore'][_0x1e4ac3(0x428)](_0x4efa0b);}else{const _0x2a2f77=_0x1789a0[_0x1e4ac3(0x20d)];if(_0x2a2f77[_0x1e4ac3(0x389)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1406b7=_0x24ca5a(_0x311fb3['$1']),_0x3c1383=_0x1e4ac3(0x31a)[_0x1e4ac3(0x47a)](_0x1406b7);_0x5278cd[_0x1e4ac3(0x24f)]['skillEnableJS'][_0x43ac16['id']]=new _0x494e6d('skill',_0x3c1383);}if(_0x2a2f77[_0x1e4ac3(0x389)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x398e26=_0x50d501(_0x369889['$1']),_0x4b25ac=_0x1e4ac3(0x2aa)[_0x1e4ac3(0x47a)](_0x398e26);_0x4abc69['SkillsStatesCore']['skillVisibleJS'][_0x42c2d6['id']]=new _0x36b503(_0x1e4ac3(0x25a),_0x4b25ac);}}}},Scene_Boot['prototype'][_0x54bc45(0x2e3)]=function(){const _0x329112=_0x54bc45;for(const _0x4816e8 of $dataStates){if('TTIQp'===_0x329112(0x3b3)){if(!_0x4816e8)continue;VisuMZ[_0x329112(0x24f)][_0x329112(0x290)](_0x4816e8),VisuMZ[_0x329112(0x24f)][_0x329112(0x1e3)](_0x4816e8),VisuMZ[_0x329112(0x24f)][_0x329112(0x32a)](_0x4816e8),VisuMZ[_0x329112(0x24f)][_0x329112(0x29d)](_0x4816e8);}else{const _0x13166d=_0x518792[_0x329112(0x346)]('['+_0x287d62['$1'][_0x329112(0x389)](/\d+/g)+']');for(const _0x379694 of _0x13166d){if(_0x10e0d7['value'](_0x379694))return!![];}return![];}}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x4f5)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x54bc45(0x4f5)]=function(_0x140c5d){const _0x342f83=_0x54bc45;VisuMZ[_0x342f83(0x24f)][_0x342f83(0x4f5)][_0x342f83(0x462)](this,_0x140c5d),VisuMZ['SkillsStatesCore'][_0x342f83(0x318)](_0x140c5d),VisuMZ[_0x342f83(0x24f)]['Parse_Notetags_Skill_JS'](_0x140c5d);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x4a6)]=VisuMZ[_0x54bc45(0x4a6)],VisuMZ[_0x54bc45(0x4a6)]=function(_0x1a81e5){const _0x35975b=_0x54bc45;VisuMZ[_0x35975b(0x24f)][_0x35975b(0x4a6)][_0x35975b(0x462)](this,_0x1a81e5),VisuMZ[_0x35975b(0x24f)][_0x35975b(0x290)](_0x1a81e5),VisuMZ['SkillsStatesCore'][_0x35975b(0x1e3)](_0x1a81e5),VisuMZ[_0x35975b(0x24f)][_0x35975b(0x32a)](_0x1a81e5),VisuMZ['SkillsStatesCore'][_0x35975b(0x29d)](_0x1a81e5);},VisuMZ[_0x54bc45(0x24f)]['Parse_Notetags_Skill_Cost']=function(_0x5e7c46){const _0x47ef0b=_0x54bc45,_0x1f4f5f=_0x5e7c46[_0x47ef0b(0x20d)];_0x1f4f5f[_0x47ef0b(0x389)](/<MP COST:[ ](\d+)>/i)&&(_0x5e7c46[_0x47ef0b(0x401)]=Number(RegExp['$1'])),_0x1f4f5f[_0x47ef0b(0x389)](/<TP COST:[ ](\d+)>/i)&&(_0x5e7c46[_0x47ef0b(0x4ab)]=Number(RegExp['$1']));},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x297)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x3b5)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x428)]=function(_0x25f8d5){const _0x46a30c=_0x54bc45,_0x58ac2d=_0x25f8d5[_0x46a30c(0x20d)];if(_0x58ac2d['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0xd32cae=String(RegExp['$1']),_0x3b5566=_0x46a30c(0x31a)[_0x46a30c(0x47a)](_0xd32cae);VisuMZ[_0x46a30c(0x24f)][_0x46a30c(0x297)][_0x25f8d5['id']]=new Function('skill',_0x3b5566);}if(_0x58ac2d[_0x46a30c(0x389)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x45c504=String(RegExp['$1']),_0x26f21e=_0x46a30c(0x2aa)[_0x46a30c(0x47a)](_0x45c504);VisuMZ['SkillsStatesCore'][_0x46a30c(0x3b5)][_0x25f8d5['id']]=new Function(_0x46a30c(0x25a),_0x26f21e);}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x290)]=function(_0x37fc89){const _0x8e7b6=_0x54bc45;_0x37fc89[_0x8e7b6(0x518)]=[_0x8e7b6(0x34d),'ANY'];const _0x1321a8=_0x37fc89[_0x8e7b6(0x20d)],_0xe86727=_0x1321a8['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xe86727)for(const _0x54a873 of _0xe86727){_0x54a873[_0x8e7b6(0x389)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xe01b9e=String(RegExp['$1'])[_0x8e7b6(0x41d)]()[_0x8e7b6(0x36a)]()[_0x8e7b6(0x350)](',');for(const _0x2f7a33 of _0xe01b9e){_0x37fc89[_0x8e7b6(0x518)][_0x8e7b6(0x3d2)](_0x2f7a33[_0x8e7b6(0x36a)]());}}if(_0x1321a8[_0x8e7b6(0x389)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x51beb3=RegExp['$1'][_0x8e7b6(0x350)](/[\r\n]+/);for(const _0x6bab39 of _0x51beb3){_0x8e7b6(0x409)!=='geTnb'?(this['removeState'](_0x312b63['id']),this[_0x8e7b6(0x39a)](_0x13e21f['id']),this['onExpireStateGlobalJS'](_0x480d85['id'])):_0x37fc89[_0x8e7b6(0x518)][_0x8e7b6(0x3d2)](_0x6bab39[_0x8e7b6(0x41d)]()[_0x8e7b6(0x36a)]());}}if(_0x1321a8[_0x8e7b6(0x389)](/<POSITIVE STATE>/i)){if(_0x8e7b6(0x21f)!=='jTLhi')_0x37fc89[_0x8e7b6(0x518)][_0x8e7b6(0x3d2)](_0x8e7b6(0x423));else{if(!_0x4ded95['isLearnedSkill'](_0x254553))return!![];}}_0x1321a8['match'](/<NEGATIVE STATE>/i)&&(_0x8e7b6(0x35f)!==_0x8e7b6(0x365)?_0x37fc89[_0x8e7b6(0x518)]['push']('NEGATIVE'):_0x1be573[_0x8e7b6(0x24f)][_0x8e7b6(0x429)]['Buffs'][_0x8e7b6(0x48d)][_0x8e7b6(0x462)](this,_0x2ddf75));},VisuMZ[_0x54bc45(0x24f)]['statePassiveConditionJS']={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS']=function(_0x3937a3){const _0x5d60c7=_0x54bc45,_0x1f727a=_0x3937a3[_0x5d60c7(0x20d)];if(_0x1f727a['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x293656=String(RegExp['$1']),_0xc9b8ba=_0x5d60c7(0x21d)['format'](_0x293656);VisuMZ[_0x5d60c7(0x24f)]['statePassiveConditionJS'][_0x3937a3['id']]=new Function(_0x5d60c7(0x28a),_0xc9b8ba);}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x4e4)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x303)]={},VisuMZ['SkillsStatesCore'][_0x54bc45(0x236)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x225)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x29a)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2b3)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x32a)]=function(_0x18f8d3){const _0x8c8f32=_0x54bc45,_0x5b2010=_0x18f8d3[_0x8c8f32(0x20d)],_0x1866fc=_0x8c8f32(0x3cc);if(_0x5b2010[_0x8c8f32(0x389)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x31be7f=String(RegExp['$1']),_0x2a8d27=_0x1866fc['format'](_0x31be7f,_0x8c8f32(0x492),-0x1,'slipHp');VisuMZ[_0x8c8f32(0x24f)]['stateHpSlipDamageJS'][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x2a8d27);}else{if(_0x5b2010[_0x8c8f32(0x389)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x37fde3=String(RegExp['$1']),_0x1fb8c2=_0x1866fc['format'](_0x37fde3,_0x8c8f32(0x3fb),0x1,_0x8c8f32(0x332));VisuMZ[_0x8c8f32(0x24f)][_0x8c8f32(0x303)][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x1fb8c2);}}if(_0x5b2010['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x572ba3=String(RegExp['$1']),_0x5a01e0=_0x1866fc[_0x8c8f32(0x47a)](_0x572ba3,_0x8c8f32(0x492),-0x1,'slipMp');VisuMZ[_0x8c8f32(0x24f)][_0x8c8f32(0x236)][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x5a01e0);}else{if(_0x5b2010[_0x8c8f32(0x389)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x8c8f32(0x527)===_0x8c8f32(0x527)){const _0x570df6=String(RegExp['$1']),_0x47cd74=_0x1866fc[_0x8c8f32(0x47a)](_0x570df6,_0x8c8f32(0x3fb),0x1,_0x8c8f32(0x4cc));VisuMZ['SkillsStatesCore']['stateMpSlipHealJS'][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x47cd74);}else{const _0x3bab5a=_0x1a7007['parse']('['+_0x525d83['$1'][_0x8c8f32(0x389)](/\d+/g)+']');for(const _0x2ee1be of _0x3bab5a){if(_0x274360[_0x8c8f32(0x264)](_0x2ee1be))return![];}return!![];}}}if(_0x5b2010[_0x8c8f32(0x389)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x3be57=String(RegExp['$1']),_0x4dbfd5=_0x1866fc['format'](_0x3be57,_0x8c8f32(0x492),-0x1,_0x8c8f32(0x2ac));VisuMZ[_0x8c8f32(0x24f)]['stateTpSlipDamageJS'][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x4dbfd5);}else{if(_0x5b2010['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x2b32e5=String(RegExp['$1']),_0x1ff375=_0x1866fc[_0x8c8f32(0x47a)](_0x2b32e5,_0x8c8f32(0x3fb),0x1,_0x8c8f32(0x2ac));VisuMZ['SkillsStatesCore'][_0x8c8f32(0x2b3)][_0x18f8d3['id']]=new Function(_0x8c8f32(0x3bb),_0x1ff375);}}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2ad)]={},VisuMZ[_0x54bc45(0x24f)]['stateEraseJS']={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x51e)]={},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x29d)]=function(_0x3ae14a){const _0x33114d=_0x54bc45,_0x4c144a=_0x3ae14a['note'],_0x462498='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x4c144a[_0x33114d(0x389)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if('lfRNr'!==_0x33114d(0x351))_0x24c049[_0x4bf083][_0xd5fb0f][_0x33114d(0x462)](this,_0x11f2c3);else{const _0x503637=String(RegExp['$1']),_0x5c969c=_0x462498[_0x33114d(0x47a)](_0x503637);VisuMZ['SkillsStatesCore'][_0x33114d(0x2ad)][_0x3ae14a['id']]=new Function(_0x33114d(0x3bb),_0x5c969c);}}if(_0x4c144a[_0x33114d(0x389)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x4b0fc1=String(RegExp['$1']),_0x33362d=_0x462498[_0x33114d(0x47a)](_0x4b0fc1);VisuMZ[_0x33114d(0x24f)][_0x33114d(0x521)][_0x3ae14a['id']]=new Function(_0x33114d(0x3bb),_0x33362d);}if(_0x4c144a[_0x33114d(0x389)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x4ab1d9=String(RegExp['$1']),_0x36454c=_0x462498['format'](_0x4ab1d9);VisuMZ['SkillsStatesCore']['stateExpireJS'][_0x3ae14a['id']]=new Function(_0x33114d(0x3bb),_0x36454c);}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x364)]=function(){const _0x131b37=_0x54bc45;if(!VisuMZ[_0x131b37(0x24f)][_0x131b37(0x429)]['States'][_0x131b37(0x1da)])return;for(const _0x5d48e7 of $dataStates){if(_0x131b37(0x2ce)!==_0x131b37(0x2ce))_0x2bd9b5[_0x131b37(0x4ff)]['onEraseDebuff']['call'](this,_0x3ffc7e),this[_0x131b37(0x2a9)](_0xd16a77);else{if(!_0x5d48e7)continue;_0x5d48e7[_0x131b37(0x40b)]===0x4&&_0x5d48e7[_0x131b37(0x368)]===0x1&&('KXbcm'!=='iWUxp'?_0x5d48e7[_0x131b37(0x368)]=0x2:(_0x5c23d0[_0x131b37(0x24f)][_0x131b37(0x519)][_0x131b37(0x462)](this),this[_0x131b37(0x2b9)]=null));}}},DataManager['getClassIdWithName']=function(_0x1386ed){const _0xbec6f8=_0x54bc45;_0x1386ed=_0x1386ed[_0xbec6f8(0x41d)]()[_0xbec6f8(0x36a)](),this['_classIDs']=this['_classIDs']||{};if(this[_0xbec6f8(0x4d1)][_0x1386ed])return this['_classIDs'][_0x1386ed];for(const _0x12697f of $dataClasses){if(_0xbec6f8(0x218)!=='zGHce'){if(!_0x12697f)continue;let _0xb85673=_0x12697f[_0xbec6f8(0x4c7)];_0xb85673=_0xb85673[_0xbec6f8(0x3da)](/\x1I\[(\d+)\]/gi,''),_0xb85673=_0xb85673[_0xbec6f8(0x3da)](/\\I\[(\d+)\]/gi,''),this[_0xbec6f8(0x4d1)][_0xb85673['toUpperCase']()[_0xbec6f8(0x36a)]()]=_0x12697f['id'];}else{if(typeof _0x4f3ef2!=='number')_0x98b32d=_0x1b04e5['id'];this[_0xbec6f8(0x399)]=this[_0xbec6f8(0x399)]||{},this['_stateDisplay'][_0x5e9285]=_0x33a3c3;}}return this[_0xbec6f8(0x4d1)][_0x1386ed]||0x0;},DataManager[_0x54bc45(0x486)]=function(_0x1ac3c3){const _0x453630=_0x54bc45;this[_0x453630(0x210)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x1ac3c3['id']])return this[_0x453630(0x210)][_0x1ac3c3['id']];this[_0x453630(0x210)][_0x1ac3c3['id']]=[_0x1ac3c3[_0x453630(0x308)]];if(_0x1ac3c3[_0x453630(0x20d)][_0x453630(0x389)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x453630(0x344)===_0x453630(0x2dd)){const _0x34eece=_0x3f9891[_0x82bf78];if(_0x34eece)_0xa4295f['push'](_0x34eece);}else{const _0x556626=JSON[_0x453630(0x346)]('['+RegExp['$1'][_0x453630(0x389)](/\d+/g)+']');this['_stypeIDs'][_0x1ac3c3['id']]=this[_0x453630(0x210)][_0x1ac3c3['id']][_0x453630(0x42f)](_0x556626);}}else{if(_0x1ac3c3[_0x453630(0x20d)][_0x453630(0x389)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x453630(0x39f)!=='BGYbq'){if(!_0x2e729f[_0x453630(0x24f)]['Settings'][_0x453630(0x21e)][_0x453630(0x40c)])return;const _0x528157=_0x102157[_0x453630(0x2bc)](_0xbddbe3),_0xc32859=_0x53a2aa['buff'](_0x32e929),_0x2e468b=_0x802358[_0x453630(0x2b8)],_0x4796d8=_0x2a9f21[_0x453630(0x524)]/0x2,_0x42b0ea=_0xc32859>0x0?_0x53b091[_0x453630(0x37c)]():_0x1d8e74['debuffColor']();this[_0x453630(0x383)](_0x42b0ea),this[_0x453630(0x4e8)](_0x453630(0x356)),this[_0x453630(0x1e8)][_0x453630(0x4d4)]=!![],this[_0x453630(0x1e8)]['fontSize']=_0x44854f[_0x453630(0x24f)][_0x453630(0x429)][_0x453630(0x21e)]['DataFontSize'],_0x33ede1+=_0x8bad42[_0x453630(0x24f)][_0x453630(0x429)][_0x453630(0x21e)][_0x453630(0x373)],_0x2526a8+=_0xd13775[_0x453630(0x24f)]['Settings'][_0x453630(0x21e)]['DataOffsetY'];const _0x3a8c75=_0x453630(0x284)[_0x453630(0x47a)](_0x3cdc06[_0x453630(0x30a)](_0x528157*0x64));this[_0x453630(0x425)](_0x3a8c75,_0x5dc177,_0x31f752,_0x2e468b,_0x453630(0x2cf)),this[_0x453630(0x1e8)][_0x453630(0x4d4)]=![],this['resetFontSettings']();}else{const _0x245eef=RegExp['$1'][_0x453630(0x350)](',');for(const _0x517497 of _0x245eef){if('lnqPa'!==_0x453630(0x248))_0x222692['autoRemovalTiming']=0x2;else{const _0x3c45c6=DataManager[_0x453630(0x45d)](_0x517497);if(_0x3c45c6)this['_stypeIDs'][_0x1ac3c3['id']][_0x453630(0x3d2)](_0x3c45c6);}}}}}return this[_0x453630(0x210)][_0x1ac3c3['id']];},DataManager['getStypeIdWithName']=function(_0x30124e){const _0x3da218=_0x54bc45;_0x30124e=_0x30124e[_0x3da218(0x41d)]()[_0x3da218(0x36a)](),this[_0x3da218(0x210)]=this[_0x3da218(0x210)]||{};if(this['_stypeIDs'][_0x30124e])return this[_0x3da218(0x210)][_0x30124e];for(let _0x487a48=0x1;_0x487a48<0x64;_0x487a48++){if(!$dataSystem[_0x3da218(0x28f)][_0x487a48])continue;let _0x46c086=$dataSystem['skillTypes'][_0x487a48][_0x3da218(0x41d)]()[_0x3da218(0x36a)]();_0x46c086=_0x46c086[_0x3da218(0x3da)](/\x1I\[(\d+)\]/gi,''),_0x46c086=_0x46c086['replace'](/\\I\[(\d+)\]/gi,''),this[_0x3da218(0x210)][_0x46c086]=_0x487a48;}return this[_0x3da218(0x210)][_0x30124e]||0x0;},DataManager[_0x54bc45(0x49f)]=function(_0x86447){const _0x191f43=_0x54bc45;_0x86447=_0x86447[_0x191f43(0x41d)]()[_0x191f43(0x36a)](),this[_0x191f43(0x4e2)]=this[_0x191f43(0x4e2)]||{};if(this[_0x191f43(0x4e2)][_0x86447])return this[_0x191f43(0x4e2)][_0x86447];for(const _0xd079af of $dataSkills){if(!_0xd079af)continue;this[_0x191f43(0x4e2)][_0xd079af['name']['toUpperCase']()[_0x191f43(0x36a)]()]=_0xd079af['id'];}return this[_0x191f43(0x4e2)][_0x86447]||0x0;},DataManager[_0x54bc45(0x31f)]=function(_0x288e30){const _0xea7ed0=_0x54bc45;_0x288e30=_0x288e30[_0xea7ed0(0x41d)]()['trim'](),this[_0xea7ed0(0x4f0)]=this[_0xea7ed0(0x4f0)]||{};if(this[_0xea7ed0(0x4f0)][_0x288e30])return this['_stateIDs'][_0x288e30];for(const _0x3be1ab of $dataStates){if(!_0x3be1ab)continue;this[_0xea7ed0(0x4f0)][_0x3be1ab[_0xea7ed0(0x4c7)][_0xea7ed0(0x41d)]()[_0xea7ed0(0x36a)]()]=_0x3be1ab['id'];}return this['_stateIDs'][_0x288e30]||0x0;},DataManager[_0x54bc45(0x4d7)]=function(_0x3aef6c){const _0x2e3891=_0x54bc45;this[_0x2e3891(0x216)]=this[_0x2e3891(0x216)]||{};if(this[_0x2e3891(0x216)][_0x3aef6c])return this[_0x2e3891(0x216)][_0x3aef6c];if($dataStates[_0x3aef6c]['note'][_0x2e3891(0x389)](/<MAX TURNS:[ ](\d+)>/i))'fiVel'!==_0x2e3891(0x31e)?(_0x7e4d91+=this[_0x2e3891(0x371)](_0x3afca8),this[_0x2e3891(0x49d)](_0x5583a3,_0x5d7db8)):this[_0x2e3891(0x216)][_0x3aef6c]=Number(RegExp['$1']);else{if('cNrub'===_0x2e3891(0x334))this['_stateMaxTurns'][_0x3aef6c]=VisuMZ['SkillsStatesCore']['Settings'][_0x2e3891(0x24e)][_0x2e3891(0x263)];else return _0x1c53c0[_0x2e3891(0x45e)]&&_0x57acd8[_0x2e3891(0x4ff)][_0x2e3891(0x3f3)]['call'](this);}return this[_0x2e3891(0x216)][_0x3aef6c];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x513)]=function(_0x3fe0ce,_0x5c5716){const _0x466acf=_0x54bc45;if(VisuMZ[_0x466acf(0x513)])return VisuMZ[_0x466acf(0x513)](_0x3fe0ce,_0x5c5716);let _0xa84cbd='';if($dataActors['includes'](_0x3fe0ce))_0xa84cbd=_0x466acf(0x31d)[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);if($dataClasses[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd=_0x466acf(0x435)[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);if($dataSkills[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd=_0x466acf(0x329)[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);if($dataItems[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd='Item-%1-%2'[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);if($dataWeapons[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd='Weapon-%1-%2'['format'](_0x3fe0ce['id'],_0x5c5716);if($dataArmors[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd=_0x466acf(0x35d)[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);if($dataEnemies[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd=_0x466acf(0x3dd)['format'](_0x3fe0ce['id'],_0x5c5716);if($dataStates[_0x466acf(0x358)](_0x3fe0ce))_0xa84cbd=_0x466acf(0x3d8)[_0x466acf(0x47a)](_0x3fe0ce['id'],_0x5c5716);return _0xa84cbd;},ColorManager['getColorDataFromPluginParameters']=function(_0x253479,_0x54a00f){const _0x4b7954=_0x54bc45;return _0x54a00f=String(_0x54a00f),this[_0x4b7954(0x3f6)]=this[_0x4b7954(0x3f6)]||{},_0x54a00f[_0x4b7954(0x389)](/#(.*)/i)?this[_0x4b7954(0x3f6)][_0x253479]='#%1'[_0x4b7954(0x47a)](String(RegExp['$1'])):this[_0x4b7954(0x3f6)][_0x253479]=this[_0x4b7954(0x3a8)](Number(_0x54a00f)),this[_0x4b7954(0x3f6)][_0x253479];},ColorManager['getColor']=function(_0x4864a7){const _0x13389c=_0x54bc45;return _0x4864a7=String(_0x4864a7),_0x4864a7[_0x13389c(0x389)](/#(.*)/i)?_0x13389c(0x424)[_0x13389c(0x47a)](String(RegExp['$1'])):this[_0x13389c(0x3a8)](Number(_0x4864a7));},ColorManager[_0x54bc45(0x3c8)]=function(_0x28cf0a){const _0x1c4c90=_0x54bc45;if(typeof _0x28cf0a===_0x1c4c90(0x2cd))_0x28cf0a=$dataStates[_0x28cf0a];const _0x2c3559=_0x1c4c90(0x412)[_0x1c4c90(0x47a)](_0x28cf0a['id']);this[_0x1c4c90(0x3f6)]=this[_0x1c4c90(0x3f6)]||{};if(this[_0x1c4c90(0x3f6)][_0x2c3559])return this[_0x1c4c90(0x3f6)][_0x2c3559];const _0x3ef6cb=this[_0x1c4c90(0x324)](_0x28cf0a);return this[_0x1c4c90(0x49a)](_0x2c3559,_0x3ef6cb);},ColorManager[_0x54bc45(0x324)]=function(_0x5af426){const _0x4dbeb4=_0x54bc45,_0x426ad5=_0x5af426[_0x4dbeb4(0x20d)];if(_0x426ad5[_0x4dbeb4(0x389)](/<TURN COLOR:[ ](.*)>/i)){if(_0x4dbeb4(0x1ef)!==_0x4dbeb4(0x1ef)){const _0x2eb4b7=_0x69a6ed['boxWidth']-this[_0x4dbeb4(0x259)](),_0x3586c7=this[_0x4dbeb4(0x22d)]()-this[_0x4dbeb4(0x1ee)][_0x4dbeb4(0x2fb)],_0x48dbef=this[_0x4dbeb4(0x3a3)]()?_0x1781b4[_0x4dbeb4(0x202)]-_0x2eb4b7:0x0,_0x3dba68=this[_0x4dbeb4(0x1ee)]['y']+this[_0x4dbeb4(0x1ee)][_0x4dbeb4(0x2fb)];return new _0x5c0e67(_0x48dbef,_0x3dba68,_0x2eb4b7,_0x3586c7);}else return String(RegExp['$1']);}else{if(_0x426ad5['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore']['Settings'][_0x4dbeb4(0x24e)][_0x4dbeb4(0x4df)];else return _0x426ad5['match'](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore']['Settings']['States']['ColorNegative']:VisuMZ[_0x4dbeb4(0x24f)][_0x4dbeb4(0x429)]['States'][_0x4dbeb4(0x453)];}},ColorManager[_0x54bc45(0x37c)]=function(){const _0x17c63c=_0x54bc45,_0x3a3459=_0x17c63c(0x3d5);this[_0x17c63c(0x3f6)]=this[_0x17c63c(0x3f6)]||{};if(this[_0x17c63c(0x3f6)][_0x3a3459])return this[_0x17c63c(0x3f6)][_0x3a3459];const _0x2ca3a2=VisuMZ[_0x17c63c(0x24f)][_0x17c63c(0x429)][_0x17c63c(0x21e)]['ColorBuff'];return this['getColorDataFromPluginParameters'](_0x3a3459,_0x2ca3a2);},ColorManager[_0x54bc45(0x4c5)]=function(){const _0x364a77=_0x54bc45,_0x34df83=_0x364a77(0x203);this[_0x364a77(0x3f6)]=this[_0x364a77(0x3f6)]||{};if(this[_0x364a77(0x3f6)][_0x34df83])return this[_0x364a77(0x3f6)][_0x34df83];const _0x147588=VisuMZ[_0x364a77(0x24f)]['Settings'][_0x364a77(0x21e)][_0x364a77(0x2c4)];return this[_0x364a77(0x49a)](_0x34df83,_0x147588);},SceneManager[_0x54bc45(0x3fe)]=function(){const _0x4c3f0e=_0x54bc45;return this[_0x4c3f0e(0x23d)]&&this[_0x4c3f0e(0x23d)][_0x4c3f0e(0x4c2)]===Scene_Battle;},VisuMZ['SkillsStatesCore']['BattleManager_endAction']=BattleManager['endAction'],BattleManager[_0x54bc45(0x4f3)]=function(){const _0x576c28=_0x54bc45;this[_0x576c28(0x4c4)](),VisuMZ[_0x576c28(0x24f)]['BattleManager_endAction'][_0x576c28(0x462)](this);},BattleManager[_0x54bc45(0x4c4)]=function(){const _0x339304=_0x54bc45,_0x39cd41=VisuMZ[_0x339304(0x24f)][_0x339304(0x429)][_0x339304(0x24e)];if(!_0x39cd41)return;if(_0x39cd41[_0x339304(0x1da)]===![])return;if(!this[_0x339304(0x482)])return;this[_0x339304(0x482)]['updateStatesActionEnd']();},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x4c4)]=function(){const _0x579c63=_0x54bc45;if(BattleManager[_0x579c63(0x490)]!==_0x579c63(0x3b0))return;if(this['_lastStatesActionEndFrameCount']===Graphics['frameCount'])return;this[_0x579c63(0x4a1)]=Graphics[_0x579c63(0x27e)];for(const _0x3c476d of this[_0x579c63(0x3d6)]){const _0x2f8aeb=$dataStates[_0x3c476d];if(!_0x2f8aeb)continue;if(_0x2f8aeb[_0x579c63(0x368)]!==0x1)continue;if(this[_0x579c63(0x1f9)][_0x3c476d]>0x0){if(_0x579c63(0x465)===_0x579c63(0x1f5)){if(this[_0x579c63(0x4fd)](_0x20a8d4))return!![];}else this[_0x579c63(0x1f9)][_0x3c476d]--;}}this[_0x579c63(0x51a)](0x1);},Game_BattlerBase['prototype'][_0x54bc45(0x212)]=function(){const _0x3974a8=_0x54bc45,_0x3d2a86=VisuMZ[_0x3974a8(0x24f)]['Settings'][_0x3974a8(0x24e)];for(const _0x8e1730 of this[_0x3974a8(0x3d6)]){if(_0x3974a8(0x49b)!==_0x3974a8(0x214)){const _0x1fbdac=$dataStates[_0x8e1730];if(_0x3d2a86&&_0x3d2a86[_0x3974a8(0x1da)]!==![]){if(_0x1fbdac&&_0x1fbdac['autoRemovalTiming']===0x1)continue;}if(this[_0x3974a8(0x1f9)][_0x8e1730]>0x0){if('RnAwg'===_0x3974a8(0x3c6))this[_0x3974a8(0x1f9)][_0x8e1730]--;else{const _0x159c60=_0xe5e230[_0x3974a8(0x24f)][_0x3974a8(0x429)][_0x3974a8(0x4c8)];if(this[_0x3974a8(0x498)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x159c60[_0x3974a8(0x4a3)]?_0x3974a8(0x356):_0xceb2[_0x3974a8(0x26d)]();}}}else this['contents']['fontFace']=_0x49b453[_0x3974a8(0x2b4)](),this[_0x3974a8(0x1e8)]['fontSize']=_0x15f06c[_0x3974a8(0x28d)](),this[_0x3974a8(0x450)]();}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x398)]=Game_Switches['prototype'][_0x54bc45(0x3ae)],Game_Switches[_0x54bc45(0x4ff)][_0x54bc45(0x3ae)]=function(){const _0x3c2660=_0x54bc45;VisuMZ['SkillsStatesCore']['Game_Switches_onChange'][_0x3c2660(0x462)](this);const _0x50b414=VisuMZ[_0x3c2660(0x24f)][_0x3c2660(0x429)][_0x3c2660(0x314)][_0x3c2660(0x207)]??!![];if(!_0x50b414)return;if(SceneManager[_0x3c2660(0x3fe)]())for(const _0x2baa22 of BattleManager['allBattleMembers']()){if(_0x2baa22)_0x2baa22[_0x3c2660(0x375)]();}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x51c)]=Game_Variables[_0x54bc45(0x4ff)][_0x54bc45(0x3ae)],Game_Variables[_0x54bc45(0x4ff)]['onChange']=function(){const _0x21ac95=_0x54bc45;VisuMZ[_0x21ac95(0x24f)][_0x21ac95(0x51c)][_0x21ac95(0x462)](this);const _0x319b3a=VisuMZ[_0x21ac95(0x24f)][_0x21ac95(0x429)]['PassiveStates']['RefreshCacheVar']??!![];if(!_0x319b3a)return;if(SceneManager[_0x21ac95(0x3fe)]()){if(_0x21ac95(0x434)===_0x21ac95(0x434))for(const _0x612a7a of BattleManager[_0x21ac95(0x2b7)]()){if(_0x21ac95(0x337)==='LjMcp')return _0x313abb(_0xb1c30d['$1']);else{if(_0x612a7a)_0x612a7a[_0x21ac95(0x375)]();}}else this[_0x21ac95(0x3b6)](_0x1e2ecc,_0x1b4d76,_0xfec9cd,_0x5c02b4),_0xe4dbcb++,_0x305820%0x2===0x0?(_0x2209c7=_0x59b808,_0x3f61a9+=_0x4ba7e1):_0x2eb04b+=_0x568b1f+0x18;}},VisuMZ['SkillsStatesCore'][_0x54bc45(0x213)]=Game_Action[_0x54bc45(0x4ff)][_0x54bc45(0x50c)],Game_Action[_0x54bc45(0x4ff)]['applyItemUserEffect']=function(_0x37f76a){const _0x32879c=_0x54bc45;VisuMZ[_0x32879c(0x24f)][_0x32879c(0x213)][_0x32879c(0x462)](this,_0x37f76a),this['applySkillsStatesCoreEffects'](_0x37f76a);},Game_Action[_0x54bc45(0x4ff)][_0x54bc45(0x2df)]=function(_0x5678eb){const _0xb676d2=_0x54bc45;this['applyStateCategoryRemovalEffects'](_0x5678eb),this[_0xb676d2(0x394)](_0x5678eb),this['applyBuffTurnManipulationEffects'](_0x5678eb),this[_0xb676d2(0x4f8)](_0x5678eb);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x265)]=Game_Action[_0x54bc45(0x4ff)][_0x54bc45(0x382)],Game_Action[_0x54bc45(0x4ff)]['testApply']=function(_0xf7bc15){const _0x4ce063=_0x54bc45;if(this[_0x4ce063(0x267)](_0xf7bc15)){if(_0x4ce063(0x32e)===_0x4ce063(0x32e))return!![];else for(const _0x37a34f of _0x1e9757){let _0x26e6b1=0x0,_0x401df8=0x0;if(_0x37a34f['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x26e6b1=_0x1ccddf(_0x3c1ee3['$1']),_0x401df8=_0xf148de(_0x10a815['$2']);else _0x37a34f['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x26e6b1=_0x316347[_0x4ce063(0x31f)](_0x3fa02f['$1']),_0x401df8=_0x19a742(_0x15ba52['$2']));_0x19014b['addStateTurns'](_0x26e6b1,_0x401df8),this[_0x4ce063(0x4a9)](_0x2b9acb);}}return VisuMZ[_0x4ce063(0x24f)]['Game_Action_testApply'][_0x4ce063(0x462)](this,_0xf7bc15);},Game_Action[_0x54bc45(0x4ff)][_0x54bc45(0x267)]=function(_0x366e75){const _0x165dd6=_0x54bc45;if(!this['item']())return;const _0x5bcc5d=this[_0x165dd6(0x32c)]()[_0x165dd6(0x20d)];if(_0x5bcc5d['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x4564d5=String(RegExp['$1']);if(_0x366e75['isStateCategoryAffected'](_0x4564d5))return!![];}if(_0x5bcc5d['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x165dd6(0x3e3)===_0x165dd6(0x3e3)){const _0x1356fd=Number(RegExp['$1']);if(_0x366e75[_0x165dd6(0x2f0)](_0x1356fd))return!![];}else{if(!_0x3435c3[_0x165dd6(0x1e5)])return![];else return this[_0x165dd6(0x2b2)]()?!![]:_0x4e6da2[_0x165dd6(0x24f)][_0x165dd6(0x429)][_0x165dd6(0x2af)]['ShowShopStatus'];}}else{if(_0x5bcc5d['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x165dd6(0x2fd)!=='mPrDm'){const _0xbbefb=DataManager[_0x165dd6(0x31f)](RegExp['$1']);if(_0x366e75[_0x165dd6(0x2f0)](_0xbbefb))return!![];}else{if(!_0x5c4ee3[_0x165dd6(0x264)](_0x2c8461))return!![];}}}return![];},Game_Action[_0x54bc45(0x4ff)][_0x54bc45(0x241)]=function(_0x2d74a8){const _0x3d41af=_0x54bc45;if(_0x2d74a8['states']()[_0x3d41af(0x413)]<=0x0)return;const _0x12a92a=this[_0x3d41af(0x32c)]()[_0x3d41af(0x20d)];{if(_0x3d41af(0x514)!==_0x3d41af(0x342)){const _0x130035=_0x12a92a['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x130035)for(const _0x4e4703 of _0x130035){if(_0x3d41af(0x4f7)!==_0x3d41af(0x22b)){_0x4e4703[_0x3d41af(0x389)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x566778=String(RegExp['$1']);_0x2d74a8[_0x3d41af(0x2b0)](_0x566778);}else{if(this['testSkillStatesCoreNotetags'](_0x466d5f))return!![];return _0x28ab9d[_0x3d41af(0x24f)][_0x3d41af(0x265)][_0x3d41af(0x462)](this,_0x4833f2);}}}else this[_0x3d41af(0x216)][_0x458a9a]=_0x242f24(_0x165712['$1']);}{if('uZRzf'!==_0x3d41af(0x2a8)){const _0x250863=_0x12a92a['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x250863)for(const _0x5790aa of _0x250863){_0x5790aa['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x392f3f=String(RegExp['$1']),_0x2e97e7=Number(RegExp['$2']);_0x2d74a8[_0x3d41af(0x1dd)](_0x392f3f,_0x2e97e7);}}else return _0x201ef9[_0x3d41af(0x24f)][_0x3d41af(0x429)][_0x3d41af(0x2af)][_0x3d41af(0x517)];}},Game_Action[_0x54bc45(0x4ff)]['applyStateTurnManipulationEffects']=function(_0xc2d247){const _0x178538=_0x54bc45,_0x582316=this[_0x178538(0x32c)]()[_0x178538(0x20d)],_0x39a74e=_0x582316['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x39a74e){if(_0x178538(0x449)!=='HepXV'){if(this[_0x178538(0x2ab)]||this[_0x178538(0x2f2)])return;const _0x2d5474=_0xca848f[_0x178538(0x24f)][_0x178538(0x2ad)];if(_0x2d5474[_0x30089d])_0x2d5474[_0x19bb86][_0x178538(0x462)](this,_0x276fbb);}else for(const _0xdfb32c of _0x39a74e){let _0x1b1c7c=0x0,_0xe1901c=0x0;if(_0xdfb32c[_0x178538(0x389)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1b1c7c=Number(RegExp['$1']),_0xe1901c=Number(RegExp['$2']);else _0xdfb32c[_0x178538(0x389)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x1b1c7c=DataManager[_0x178538(0x31f)](RegExp['$1']),_0xe1901c=Number(RegExp['$2']));_0xc2d247[_0x178538(0x49d)](_0x1b1c7c,_0xe1901c),this['makeSuccess'](_0xc2d247);}}const _0x23c42b=_0x582316['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x23c42b)for(const _0x1eec34 of _0x23c42b){if(_0x178538(0x452)!=='gTNZD'){let _0x5486a1=0x0,_0x5d7bdd=0x0;if(_0x1eec34[_0x178538(0x389)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5486a1=Number(RegExp['$1']),_0x5d7bdd=Number(RegExp['$2']);else _0x1eec34[_0x178538(0x389)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x178538(0x246)!==_0x178538(0x2ba)?(_0x5486a1=DataManager['getStateIdWithName'](RegExp['$1']),_0x5d7bdd=Number(RegExp['$2'])):(_0x34e6e1[_0x178538(0x4ff)][_0x178538(0x379)][_0x178538(0x462)](this,_0x3bff1a),this[_0x178538(0x4b7)](_0x40bfff)));_0xc2d247[_0x178538(0x3de)](_0x5486a1,_0x5d7bdd),this[_0x178538(0x4a9)](_0xc2d247);}else{if(_0x123bb7[_0x178538(0x2d0)][_0x178538(0x41d)]()==='TP'){let _0x59e5df=_0x590bba[_0x178538(0x4f6)][_0x178538(0x462)](this,_0x21611e);return _0x59e5df=this['adjustSkillCost'](_0x66df9c,_0x59e5df,_0x5d8795),_0x59e5df;}}}},Game_Action[_0x54bc45(0x4ff)]['applyBuffTurnManipulationEffects']=function(_0x158f50){const _0x29a2f7=_0x54bc45,_0x22f1e1=[_0x29a2f7(0x408),_0x29a2f7(0x305),_0x29a2f7(0x44b),_0x29a2f7(0x41a),_0x29a2f7(0x420),_0x29a2f7(0x2eb),'AGI',_0x29a2f7(0x405)],_0x19205b=this[_0x29a2f7(0x32c)]()[_0x29a2f7(0x20d)],_0x4c6006=_0x19205b[_0x29a2f7(0x389)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x4c6006){if(_0x29a2f7(0x418)!==_0x29a2f7(0x427))for(const _0x179f43 of _0x4c6006){_0x179f43['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3b7e11=_0x22f1e1['indexOf'](String(RegExp['$1'])[_0x29a2f7(0x41d)]()),_0x4e7e7c=Number(RegExp['$2']);_0x3b7e11>=0x0&&(_0x158f50[_0x29a2f7(0x3f8)](_0x3b7e11,_0x4e7e7c),this[_0x29a2f7(0x4a9)](_0x158f50));}else this[_0x29a2f7(0x355)](_0xeef77f),this[_0x29a2f7(0x2a0)](_0xbb2cdb),this[_0x29a2f7(0x234)](_0x515fa6),this[_0x29a2f7(0x345)](_0x514174),this[_0x29a2f7(0x3f2)](_0x24cc73);}const _0x412d6c=_0x19205b['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x412d6c)for(const _0xc347ed of _0x4c6006){if(_0x29a2f7(0x2c9)===_0x29a2f7(0x42d))_0x41062d['anySwitchOn']=_0x5ca57a(_0x4c08b3['$1'])['split'](',')[_0x29a2f7(0x2c7)](_0x3aec5d=>_0x23bfd1(_0x3aec5d));else{_0xc347ed[_0x29a2f7(0x389)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3b04aa=_0x22f1e1[_0x29a2f7(0x336)](String(RegExp['$1'])[_0x29a2f7(0x41d)]()),_0x2c393b=Number(RegExp['$2']);if(_0x3b04aa>=0x0){if(_0x29a2f7(0x35a)!==_0x29a2f7(0x2ef))_0x158f50['addBuffTurns'](_0x3b04aa,_0x2c393b),this['makeSuccess'](_0x158f50);else return _0xa255a2['note'][_0x29a2f7(0x389)](/<PASSIVE STACKABLE>/i);}}}},Game_Action[_0x54bc45(0x4ff)]['applyDebuffTurnManipulationEffects']=function(_0x1b7d06){const _0x38d6fe=_0x54bc45,_0x34818c=[_0x38d6fe(0x408),_0x38d6fe(0x305),'ATK',_0x38d6fe(0x41a),_0x38d6fe(0x420),_0x38d6fe(0x2eb),_0x38d6fe(0x33a),_0x38d6fe(0x405)],_0xca45a0=this[_0x38d6fe(0x32c)]()[_0x38d6fe(0x20d)],_0x4c913d=_0xca45a0[_0x38d6fe(0x389)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4c913d)for(const _0x28864c of _0x4c913d){_0x28864c[_0x38d6fe(0x389)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x28c145=_0x34818c[_0x38d6fe(0x336)](String(RegExp['$1'])['toUpperCase']()),_0x539271=Number(RegExp['$2']);if(_0x28c145>=0x0){if(_0x38d6fe(0x31c)!==_0x38d6fe(0x31c)){_0x3c633a['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x44a745=_0x12aa8a(_0x4217bb['$1']),_0x590a90=_0x5bd5d2(_0x406c05['$2']);_0x337ecc[_0x38d6fe(0x1dd)](_0x44a745,_0x590a90);}else _0x1b7d06[_0x38d6fe(0x2c1)](_0x28c145,_0x539271),this[_0x38d6fe(0x4a9)](_0x1b7d06);}}const _0x529fee=_0xca45a0[_0x38d6fe(0x389)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x529fee)for(const _0x3ea05b of _0x4c913d){if(_0x38d6fe(0x3c2)!==_0x38d6fe(0x3c2))_0x147ff4[_0x38d6fe(0x24f)][_0x38d6fe(0x43f)][_0x38d6fe(0x462)](this),this['updateTurnDisplaySprite']();else{_0x3ea05b[_0x38d6fe(0x389)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3dc9ee=_0x34818c['indexOf'](String(RegExp['$1'])[_0x38d6fe(0x41d)]()),_0x22790f=Number(RegExp['$2']);if(_0x3dc9ee>=0x0){if(_0x38d6fe(0x463)!=='tXjdS'){_0xd6b41a[_0x38d6fe(0x4ff)][_0x38d6fe(0x4dd)][_0x38d6fe(0x462)](this);const _0x25e515=_0xf631a8[_0x38d6fe(0x24f)][_0x38d6fe(0x429)][_0x38d6fe(0x314)]['Actor'];this['_cache'][_0x38d6fe(0x4e5)]=this['_cache'][_0x38d6fe(0x4e5)][_0x38d6fe(0x42f)](_0x25e515);}else _0x1b7d06['addDebuffTurns'](_0x3dc9ee,_0x22790f),this['makeSuccess'](_0x1b7d06);}}}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x512)]=Game_BattlerBase[_0x54bc45(0x4ff)]['initMembers'],Game_BattlerBase['prototype'][_0x54bc45(0x327)]=function(){const _0x41e28e=_0x54bc45;this[_0x41e28e(0x4d6)]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x41e28e(0x24f)][_0x41e28e(0x512)][_0x41e28e(0x462)](this);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x1e6)]=function(){const _0x3a4fea=_0x54bc45;this[_0x3a4fea(0x330)]='',this['_stateData']={},this['_stateDisplay']={},this['_stateOrigin']={};},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3ee)]=function(_0x3995db){const _0x282d76=_0x54bc45;return this[_0x282d76(0x4d6)]=this['_cache']||{},this[_0x282d76(0x4d6)][_0x3995db]!==undefined;},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x48c)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x375)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x375)]=function(){const _0x2a35e7=_0x54bc45;this[_0x2a35e7(0x4d6)]={},VisuMZ['SkillsStatesCore'][_0x2a35e7(0x48c)][_0x2a35e7(0x462)](this);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x48f)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x464)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x464)]=function(_0x35fa25){const _0x287b12=_0x54bc45;let _0xdb6809=this[_0x287b12(0x2f0)](_0x35fa25);VisuMZ[_0x287b12(0x24f)][_0x287b12(0x48f)][_0x287b12(0x462)](this,_0x35fa25);if(_0xdb6809&&!this['isStateAffected'](_0x35fa25))this[_0x287b12(0x370)](_0x35fa25);},Game_BattlerBase[_0x54bc45(0x4ff)]['onRemoveState']=function(_0x2f490b){const _0x3bba2a=_0x54bc45;this[_0x3bba2a(0x515)](_0x2f490b),this[_0x3bba2a(0x532)](_0x2f490b);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x3dc)]=Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x33d)],Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x33d)]=function(){const _0x52beeb=_0x54bc45;VisuMZ[_0x52beeb(0x24f)][_0x52beeb(0x3dc)][_0x52beeb(0x462)](this),this[_0x52beeb(0x377)]();},VisuMZ[_0x54bc45(0x24f)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x480)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x480)]=function(_0x520ca1){const _0x228c3b=_0x54bc45,_0x13bfaa=$dataStates[_0x520ca1],_0x33d7cd=this['stateTurns'](_0x520ca1),_0x543b3f=this[_0x228c3b(0x278)](_0x13bfaa)[_0x228c3b(0x2de)]()[_0x228c3b(0x36a)]();switch(_0x543b3f){case'ignore':if(_0x33d7cd<=0x0)this[_0x228c3b(0x4cd)](_0x520ca1);break;case _0x228c3b(0x501):this[_0x228c3b(0x4cd)](_0x520ca1);break;case'greater':this[_0x228c3b(0x4cd)](_0x520ca1),this[_0x228c3b(0x1f9)][_0x520ca1]=Math['max'](this[_0x228c3b(0x1f9)][_0x520ca1],_0x33d7cd);break;case _0x228c3b(0x272):this['prepareResetStateCounts'](_0x520ca1),this[_0x228c3b(0x1f9)][_0x520ca1]+=_0x33d7cd;break;default:this[_0x228c3b(0x4cd)](_0x520ca1);break;}if(this[_0x228c3b(0x2f0)](_0x520ca1)){const _0x40fc48=DataManager[_0x228c3b(0x4d7)](_0x520ca1);this[_0x228c3b(0x1f9)][_0x520ca1]=this[_0x228c3b(0x1f9)][_0x520ca1][_0x228c3b(0x36f)](0x0,_0x40fc48);}},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4cd)]=function(_0x30e7a7){const _0x4a6e84=_0x54bc45;VisuMZ[_0x4a6e84(0x24f)][_0x4a6e84(0x21b)][_0x4a6e84(0x462)](this,_0x30e7a7);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x278)]=function(_0x23a504){const _0x44cb19=_0x54bc45,_0x49bf97=_0x23a504[_0x44cb19(0x20d)];if(_0x49bf97[_0x44cb19(0x389)](/<REAPPLY RULES:[ ](.*)>/i)){if('LZNzX'!==_0x44cb19(0x3eb))return String(RegExp['$1']);else{const _0xa3a5e0=[];for(const _0x154ce8 of this[_0x44cb19(0x228)]()[_0x44cb19(0x307)]){const _0x5f11e9=_0x51f1f2[_0x154ce8[_0x44cb19(0x3f1)]];if(_0x5f11e9&&!_0xa3a5e0['includes'](_0x5f11e9))_0xa3a5e0[_0x44cb19(0x3d2)](_0x5f11e9);}return _0xa3a5e0;}}else return VisuMZ[_0x44cb19(0x24f)][_0x44cb19(0x429)][_0x44cb19(0x24e)][_0x44cb19(0x468)];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x38d)]=Game_BattlerBase[_0x54bc45(0x4ff)]['overwriteBuffTurns'],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3c1)]=function(_0x5e834a,_0x26e13a){const _0x2e575f=_0x54bc45,_0x42a462=VisuMZ['SkillsStatesCore'][_0x2e575f(0x429)][_0x2e575f(0x21e)][_0x2e575f(0x468)],_0x8c25fc=this[_0x2e575f(0x4b1)](_0x5e834a);switch(_0x42a462){case _0x2e575f(0x522):if(_0x8c25fc<=0x0)this['_buffTurns'][_0x5e834a]=_0x26e13a;break;case _0x2e575f(0x501):this[_0x2e575f(0x322)][_0x5e834a]=_0x26e13a;break;case _0x2e575f(0x392):this[_0x2e575f(0x322)][_0x5e834a]=Math[_0x2e575f(0x397)](_0x8c25fc,_0x26e13a);break;case _0x2e575f(0x272):this[_0x2e575f(0x322)][_0x5e834a]+=_0x26e13a;break;default:VisuMZ['SkillsStatesCore'][_0x2e575f(0x38d)][_0x2e575f(0x462)](this,_0x5e834a,_0x26e13a);break;}const _0x298add=VisuMZ[_0x2e575f(0x24f)][_0x2e575f(0x429)][_0x2e575f(0x21e)][_0x2e575f(0x263)];this['_buffTurns'][_0x5e834a]=this[_0x2e575f(0x322)][_0x5e834a][_0x2e575f(0x36f)](0x0,_0x298add);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4e6)]=function(){const _0x571410=_0x54bc45;if(this['_cache'][_0x571410(0x45f)]!==undefined)return this[_0x571410(0x4d6)][_0x571410(0x45f)];this[_0x571410(0x4d6)][_0x571410(0x45f)]=![];const _0x2e34bc=this['states']();for(const _0x1613ca of _0x2e34bc){if(_0x571410(0x2e2)!=='RUkQh')return this[_0x571410(0x313)]();else{if(!_0x1613ca)continue;if(_0x1613ca['note'][_0x571410(0x389)](/<GROUP DEFEAT>/i)){this[_0x571410(0x4d6)][_0x571410(0x45f)]=!![];break;}}}return this[_0x571410(0x4d6)]['groupDefeat'];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2ea)]=Game_Unit['prototype'][_0x54bc45(0x2c6)],Game_Unit[_0x54bc45(0x4ff)]['deadMembers']=function(){const _0x3100a6=_0x54bc45;let _0x30f302=VisuMZ[_0x3100a6(0x24f)][_0x3100a6(0x2ea)][_0x3100a6(0x462)](this);return BattleManager[_0x3100a6(0x439)]&&(_0x30f302=_0x30f302['concat'](this[_0x3100a6(0x2f8)]()[_0x3100a6(0x2a5)](_0x5c2131=>_0x5c2131[_0x3100a6(0x4e6)]()))),_0x30f302;},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x421)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2ec)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2ec)]=function(){const _0x1ed50b=_0x54bc45;if(this['getStateRetainType']()!=='')this[_0x1ed50b(0x3a9)]();else{if(_0x1ed50b(0x1e0)===_0x1ed50b(0x367)){const _0x29dd79=_0x3d9771[_0x2874c1];if(_0x29dd79&&_0x29dd79[_0x1ed50b(0x20d)][_0x1ed50b(0x389)](/<NO DEATH CLEAR>/i))return!this[_0x1ed50b(0x306)](_0x14c14b)&&!this[_0x1ed50b(0x3ad)](_0x5629ed)&&!this[_0x1ed50b(0x503)]['isStateRemoved'](_0x469702);return _0x49e954['SkillsStatesCore'][_0x1ed50b(0x2b6)][_0x1ed50b(0x462)](this,_0x233003);}else VisuMZ[_0x1ed50b(0x24f)][_0x1ed50b(0x421)][_0x1ed50b(0x462)](this),this[_0x1ed50b(0x1e6)]();}},Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x2ec)]=function(){const _0x1b9ec5=_0x54bc45;this['_stateSteps']=this[_0x1b9ec5(0x50b)]||{},Game_Battler[_0x1b9ec5(0x4ff)][_0x1b9ec5(0x2ec)]['call'](this);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3a9)]=function(){const _0x2cc977=_0x54bc45,_0x5c6bdf=this['states']();for(const _0x52b428 of _0x5c6bdf){if(_0x52b428&&this['canClearState'](_0x52b428))this[_0x2cc977(0x464)](_0x52b428['id']);}this[_0x2cc977(0x4d6)]={};},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4ef)]=function(_0x15495e){const _0x33280b=_0x54bc45,_0xc5285b=this[_0x33280b(0x410)]();if(_0xc5285b!==''){if(_0x33280b(0x454)===_0x33280b(0x454)){const _0xe1dc5e=_0x15495e[_0x33280b(0x20d)];if(_0xc5285b===_0x33280b(0x1e1)&&_0xe1dc5e['match'](/<NO DEATH CLEAR>/i))return![];if(_0xc5285b===_0x33280b(0x2ca)&&_0xe1dc5e['match'](/<NO RECOVER ALL CLEAR>/i))return![];}else this['_currentTroopUniqueID']=_0x4a771f[_0x33280b(0x27e)];}return this['isStateAffected'](_0x15495e['id']);},Game_BattlerBase[_0x54bc45(0x4ff)]['getStateRetainType']=function(){const _0x3a6cb4=_0x54bc45;return this[_0x3a6cb4(0x330)];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2c3)]=function(_0x3eba70){const _0x31f0dc=_0x54bc45;this[_0x31f0dc(0x330)]=_0x3eba70;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x242)]=function(){const _0x449522=_0x54bc45;this[_0x449522(0x330)]='';},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x376)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x414)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x414)]=function(){const _0x55c982=_0x54bc45;this[_0x55c982(0x2c3)](_0x55c982(0x1e1)),VisuMZ[_0x55c982(0x24f)]['Game_BattlerBase_die'][_0x55c982(0x462)](this),this[_0x55c982(0x242)]();},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x28c)]=Game_BattlerBase['prototype']['recoverAll'],Game_BattlerBase['prototype'][_0x54bc45(0x469)]=function(){const _0x1f4f70=_0x54bc45;this[_0x1f4f70(0x2c3)](_0x1f4f70(0x2ca)),VisuMZ[_0x1f4f70(0x24f)][_0x1f4f70(0x28c)][_0x1f4f70(0x462)](this),this[_0x1f4f70(0x242)]();},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x47e)]=function(_0x3ff4bc,_0x18c201,_0x524364){return _0x18c201;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x211)]=function(_0x3ebb09){const _0xcd3058=_0x54bc45;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0xcd3058(0x200)]){if(_0xcd3058(0x238)===_0xcd3058(0x238)){let _0x47e754=settings[_0xcd3058(0x4f6)][_0xcd3058(0x462)](this,_0x3ebb09);_0x47e754=this['adjustSkillCost'](_0x3ebb09,_0x47e754,settings);if(!settings[_0xcd3058(0x3c7)][_0xcd3058(0x462)](this,_0x3ebb09,_0x47e754))return![];}else{if(!_0x35bc99)return _0x3a70ce[_0xcd3058(0x24f)][_0xcd3058(0x3aa)][_0xcd3058(0x462)](this,_0x2acaf3);if(!this[_0xcd3058(0x403)](_0x52011f))return![];if(!this[_0xcd3058(0x37a)](_0x33555e))return![];if(!this[_0xcd3058(0x4a7)](_0x30332f))return![];return!![];}}return!![];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x43e)]=function(_0xa9b2a2){const _0x2eb033=_0x54bc45;for(settings of VisuMZ[_0x2eb033(0x24f)][_0x2eb033(0x429)][_0x2eb033(0x200)]){if('BkXQv'==='osgcl'){if(!this['canUse'](_0x4edf17))return![];if(!_0x522c2b)return![];if(!this[_0x2eb033(0x27f)](_0x136699))return![];if(this[_0x2eb033(0x473)](_0x4d9e2a))return![];return!![];}else{let _0x2237f3=settings[_0x2eb033(0x4f6)][_0x2eb033(0x462)](this,_0xa9b2a2);_0x2237f3=this[_0x2eb033(0x47e)](_0xa9b2a2,_0x2237f3,settings),settings[_0x2eb033(0x3ab)][_0x2eb033(0x462)](this,_0xa9b2a2,_0x2237f3);}}},VisuMZ['SkillsStatesCore'][_0x54bc45(0x4e9)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x1f1)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x1f1)]=function(_0x3e2b03){const _0x5f54ab=_0x54bc45;if(!_0x3e2b03)return![];if(!VisuMZ[_0x5f54ab(0x24f)][_0x5f54ab(0x4e9)][_0x5f54ab(0x462)](this,_0x3e2b03))return![];if(!this[_0x5f54ab(0x245)](_0x3e2b03))return![];if(!this[_0x5f54ab(0x1f8)](_0x3e2b03))return![];if(!this[_0x5f54ab(0x48a)](_0x3e2b03))return![];return!![];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x245)]=function(_0x305d86){const _0x2e7200=_0x54bc45;if(!this[_0x2e7200(0x386)](_0x305d86))return![];return!![];},Game_BattlerBase[_0x54bc45(0x4ff)]['checkSkillConditionsSwitchNotetags']=function(_0x382c4c){const _0x82429=_0x54bc45,_0x21be7b=_0x382c4c[_0x82429(0x20d)];if(_0x21be7b[_0x82429(0x389)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('HeWuZ'!=='qiIPV'){const _0x2ca716=JSON[_0x82429(0x346)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x36d17c of _0x2ca716){if(!$gameSwitches[_0x82429(0x448)](_0x36d17c))return![];}return!![];}else _0x1d98f4[_0x82429(0x24f)][_0x82429(0x4cb)][_0x82429(0x462)](this,_0x47b84b),this[_0x82429(0x38c)]();}if(_0x21be7b['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x82429(0x391)===_0x82429(0x51f))_0x26711c[_0x5520c9][_0x5d1fda]&&_0x4daa2f[_0x5f3c59][_0x21e3eb][_0x82429(0x462)](this,_0x278251);else{const _0x5d8442=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xb9bd5a of _0x5d8442){if(!$gameSwitches['value'](_0xb9bd5a))return![];}return!![];}}if(_0x21be7b[_0x82429(0x389)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b0803=JSON['parse']('['+RegExp['$1'][_0x82429(0x389)](/\d+/g)+']');for(const _0x2ac44c of _0x5b0803){if($gameSwitches[_0x82429(0x448)](_0x2ac44c))return!![];}return![];}if(_0x21be7b[_0x82429(0x389)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x82429(0x4b5)!==_0x82429(0x4ac)){const _0x4ea401=JSON[_0x82429(0x346)]('['+RegExp['$1'][_0x82429(0x389)](/\d+/g)+']');for(const _0x550c5f of _0x4ea401){if(!$gameSwitches['value'](_0x550c5f))return!![];}return![];}else{if(typeof _0x50a9e1!==_0x82429(0x2cd))_0x5b1432=_0x5f0574['id'];const _0x3d89b7=this[_0x82429(0x4cf)](_0x29b912);_0x3d89b7[_0x25d22a]=_0x4fd27d;}}if(_0x21be7b[_0x82429(0x389)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x82429(0x27d)!=='uaWqC'){const _0x5ef1d2=0x0,_0x57684e=this[_0x82429(0x419)](),_0x19b4cf=_0x5a6bda[_0x82429(0x202)],_0x235efc=this[_0x82429(0x49c)]();return new _0x2f69fe(_0x5ef1d2,_0x57684e,_0x19b4cf,_0x235efc);}else{const _0xcf0864=JSON[_0x82429(0x346)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1e5406 of _0xcf0864){if(!$gameSwitches[_0x82429(0x448)](_0x1e5406))return!![];}return![];}}if(_0x21be7b[_0x82429(0x389)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x82429(0x275)!==_0x82429(0x275))return _0x300c56[_0x82429(0x24f)]['Settings'][_0x82429(0x2af)]['CmdWidth']??_0x12b39e['prototype'][_0x82429(0x288)][_0x82429(0x462)](this);else{const _0x2ba680=JSON[_0x82429(0x346)]('['+RegExp['$1'][_0x82429(0x389)](/\d+/g)+']');for(const _0x3db1e8 of _0x2ba680){if($gameSwitches[_0x82429(0x448)](_0x3db1e8))return![];}return!![];}}return!![];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x1f8)]=function(_0x5cf29a){const _0x1d3a20=_0x54bc45,_0x59d93c=_0x5cf29a[_0x1d3a20(0x20d)],_0x1d90c7=VisuMZ[_0x1d3a20(0x24f)]['skillEnableJS'];return _0x1d90c7[_0x5cf29a['id']]?_0x1d90c7[_0x5cf29a['id']][_0x1d3a20(0x462)](this,_0x5cf29a):!![];},Game_BattlerBase['prototype'][_0x54bc45(0x48a)]=function(_0x40ebcf){const _0x423667=_0x54bc45;return VisuMZ[_0x423667(0x24f)][_0x423667(0x429)][_0x423667(0x2af)]['SkillConditionJS'][_0x423667(0x462)](this,_0x40ebcf);},VisuMZ[_0x54bc45(0x24f)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x54bc45(0x4ff)]['skillMpCost'],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x249)]=function(_0x51e934){const _0x3a8ad2=_0x54bc45;for(settings of VisuMZ[_0x3a8ad2(0x24f)]['Settings'][_0x3a8ad2(0x200)]){if(_0x3a8ad2(0x4e1)!=='NBFbd'){if(typeof _0x2fa9e1===_0x3a8ad2(0x2cd))_0x48b3c5=_0x394d77[_0x44d22b];const _0x4c6390='_stored_state-%1-color'[_0x3a8ad2(0x47a)](_0x46a084['id']);this[_0x3a8ad2(0x3f6)]=this[_0x3a8ad2(0x3f6)]||{};if(this[_0x3a8ad2(0x3f6)][_0x4c6390])return this[_0x3a8ad2(0x3f6)][_0x4c6390];const _0x20a555=this[_0x3a8ad2(0x324)](_0x395a6a);return this['getColorDataFromPluginParameters'](_0x4c6390,_0x20a555);}else{if(settings['Name'][_0x3a8ad2(0x41d)]()==='MP'){if(_0x3a8ad2(0x292)!==_0x3a8ad2(0x292))return this[_0x3a8ad2(0x312)]&&this[_0x3a8ad2(0x312)]['active']?_0x3b466f[_0x3a8ad2(0x4a8)]:'';else{let _0x3a8ab7=settings[_0x3a8ad2(0x4f6)][_0x3a8ad2(0x462)](this,_0x51e934);return _0x3a8ab7=this[_0x3a8ad2(0x47e)](_0x51e934,_0x3a8ab7,settings),_0x3a8ab7;}}}}return VisuMZ[_0x3a8ad2(0x24f)][_0x3a8ad2(0x4fe)][_0x3a8ad2(0x462)](this,_0x51e934);},VisuMZ[_0x54bc45(0x24f)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x291)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x291)]=function(_0xd9d01c){const _0x2237f0=_0x54bc45;for(settings of VisuMZ[_0x2237f0(0x24f)][_0x2237f0(0x429)]['Costs']){if('vGykv'===_0x2237f0(0x29c)){if(settings[_0x2237f0(0x2d0)]['toUpperCase']()==='TP'){let _0x208e0d=settings[_0x2237f0(0x4f6)][_0x2237f0(0x462)](this,_0xd9d01c);return _0x208e0d=this[_0x2237f0(0x47e)](_0xd9d01c,_0x208e0d,settings),_0x208e0d;}}else for(_0x2e76fb of _0x2e4099[_0x2237f0(0x24f)]['Settings'][_0x2237f0(0x200)]){let _0xe039e8=_0x135151['CalcJS']['call'](this,_0x1047f1);_0xe039e8=this[_0x2237f0(0x47e)](_0x1993c2,_0xe039e8,_0x27c69b),_0x1b1408[_0x2237f0(0x3ab)][_0x2237f0(0x462)](this,_0x227593,_0xe039e8);}}return VisuMZ[_0x2237f0(0x24f)][_0x2237f0(0x1f6)][_0x2237f0(0x462)](this,_0xd9d01c);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x29f)]=function(_0x21ecd4){const _0x35ca4e=_0x54bc45;if(typeof _0x21ecd4===_0x35ca4e(0x2cd))_0x21ecd4=$dataStates[_0x21ecd4];return this['states']()['includes'](_0x21ecd4);},VisuMZ[_0x54bc45(0x24f)]['Game_BattlerBase_states']=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x274)],Game_BattlerBase['prototype'][_0x54bc45(0x274)]=function(){const _0x51e04b=_0x54bc45;let _0x58f9d4=VisuMZ[_0x51e04b(0x24f)]['Game_BattlerBase_states']['call'](this);if($gameTemp[_0x51e04b(0x2d1)])return _0x58f9d4;return $gameTemp['_checkingPassiveStates']=!![],this[_0x51e04b(0x4b4)](_0x58f9d4),$gameTemp['_checkingPassiveStates']=undefined,_0x58f9d4;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4b4)]=function(_0x28b3bc){const _0x51b7dc=_0x54bc45,_0x3ec286=this[_0x51b7dc(0x4e5)]();for(state of _0x3ec286){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x28b3bc['includes'](state))continue;_0x28b3bc[_0x51b7dc(0x3d2)](state);}if(_0x3ec286[_0x51b7dc(0x413)]>0x0){if(_0x51b7dc(0x4b0)!==_0x51b7dc(0x4b0))return _0x495e5d['outlineColor']();else _0x28b3bc[_0x51b7dc(0x520)]((_0x199b51,_0x55ae55)=>{const _0xab4f25=_0x51b7dc;if(_0xab4f25(0x2f9)!==_0xab4f25(0x2f9))return _0x466c9a;else{const _0x4b48b4=_0x199b51[_0xab4f25(0x51d)],_0x22cebc=_0x55ae55[_0xab4f25(0x51d)];if(_0x4b48b4!==_0x22cebc)return _0x22cebc-_0x4b48b4;return _0x199b51-_0x55ae55;}});}},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2f7)]=function(_0x501852){const _0x2bfbf1=_0x54bc45;return _0x501852[_0x2bfbf1(0x20d)][_0x2bfbf1(0x389)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x223)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x33e)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x33e)]=function(_0x2d4e27){const _0x54dfa7=_0x54bc45;this['_checkingTraitsSetSkillsStatesCore']=!![];let _0x474bbd=VisuMZ[_0x54dfa7(0x24f)][_0x54dfa7(0x223)][_0x54dfa7(0x462)](this,_0x2d4e27);return this[_0x54dfa7(0x40d)]=undefined,_0x474bbd;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x46b)]=function(){const _0x1d74b9=_0x54bc45;let _0x5c6bf1=[];this[_0x1d74b9(0x298)]=this[_0x1d74b9(0x298)]||{};for(;;){if('PuBaN'===_0x1d74b9(0x276))return _0x49b97f(_0x278afb['$1']);else{_0x5c6bf1=[];let _0x3feb33=!![];for(const _0x4a63f9 of this[_0x1d74b9(0x4d6)][_0x1d74b9(0x4e5)]){const _0x16b51b=$dataStates[_0x4a63f9];if(!_0x16b51b)continue;let _0x392cb5=this[_0x1d74b9(0x1fa)](_0x16b51b);if(this[_0x1d74b9(0x298)][_0x4a63f9]!==_0x392cb5){if(_0x1d74b9(0x2e0)!=='pzbBy')_0x3feb33=![],this[_0x1d74b9(0x298)][_0x4a63f9]=_0x392cb5;else{let _0x517ca3=this[_0x1d74b9(0x2f0)](_0x182cc8);_0x52c518[_0x1d74b9(0x24f)]['Game_BattlerBase_eraseState']['call'](this,_0xe670f7);if(_0x517ca3&&!this[_0x1d74b9(0x2f0)](_0x424137))this['onRemoveState'](_0x219e1e);}}if(!_0x392cb5)continue;_0x5c6bf1[_0x1d74b9(0x3d2)](_0x16b51b);}if(_0x3feb33)break;else{if(!this['_checkingTraitsSetSkillsStatesCore'])this[_0x1d74b9(0x375)]();this[_0x1d74b9(0x32d)]();}}}return _0x5c6bf1;},Game_BattlerBase['prototype']['meetsPassiveStateConditions']=function(_0x374245){const _0x3d47ea=_0x54bc45;if(!this[_0x3d47ea(0x3f0)](_0x374245))return![];if(!this[_0x3d47ea(0x489)](_0x374245))return![];if(!this[_0x3d47ea(0x299)](_0x374245))return![];if(!this[_0x3d47ea(0x402)](_0x374245))return![];return!![];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3f0)]=function(_0x225878){return!![];},Game_Actor['prototype'][_0x54bc45(0x3f0)]=function(_0x5696f0){const _0x5ed9ee=_0x54bc45,_0x2f49ed=_0x5696f0[_0x5ed9ee(0x20d)];if(_0x2f49ed[_0x5ed9ee(0x389)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x354afc=String(RegExp['$1'])[_0x5ed9ee(0x350)](',')[_0x5ed9ee(0x2c7)](_0x3dd00f=>_0x3dd00f[_0x5ed9ee(0x36a)]()),_0x200405=VisuMZ[_0x5ed9ee(0x24f)][_0x5ed9ee(0x2ed)](_0x354afc);return _0x200405[_0x5ed9ee(0x358)](this[_0x5ed9ee(0x477)]());}if(_0x2f49ed[_0x5ed9ee(0x389)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x2968e9=String(RegExp['$1'])[_0x5ed9ee(0x350)](',')[_0x5ed9ee(0x2c7)](_0x19ceaf=>_0x19ceaf[_0x5ed9ee(0x36a)]()),_0x6b9493=VisuMZ[_0x5ed9ee(0x24f)][_0x5ed9ee(0x2ed)](_0x2968e9);let _0x31b942=[this[_0x5ed9ee(0x477)]()];return Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x5ed9ee(0x499)]&&(_0x31b942=this[_0x5ed9ee(0x499)]()),_0x6b9493['filter'](_0xef2e88=>_0x31b942['includes'](_0xef2e88))[_0x5ed9ee(0x413)]>0x0;}return Game_BattlerBase[_0x5ed9ee(0x4ff)][_0x5ed9ee(0x3f0)][_0x5ed9ee(0x462)](this,_0x5696f0);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2ed)]=function(_0x5d8b7c){const _0xcd66dd=_0x54bc45,_0x233fd7=[];for(let _0x44da9c of _0x5d8b7c){if('FBqwL'!==_0xcd66dd(0x1ec)){_0x44da9c=(String(_0x44da9c)||'')[_0xcd66dd(0x36a)]();const _0x39d344=/^\d+$/[_0xcd66dd(0x4ed)](_0x44da9c);_0x39d344?_0x233fd7[_0xcd66dd(0x3d2)](Number(_0x44da9c)):_0x233fd7['push'](DataManager[_0xcd66dd(0x3f4)](_0x44da9c));}else return _0x450ba7[_0xcd66dd(0x24f)][_0xcd66dd(0x429)]['Gauge']['ValueOutlineWidth']||0x0;}return _0x233fd7[_0xcd66dd(0x2c7)](_0x5dd998=>$dataClasses[Number(_0x5dd998)])[_0xcd66dd(0x3f5)](null);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x489)]=function(_0x5d8553){const _0x15360a=_0x54bc45,_0x506935=DataManager['getPassiveStateConditionSwitchData'](_0x5d8553);if(_0x506935[_0x15360a(0x286)]){const _0x7e145d=_0x506935[_0x15360a(0x286)];for(const _0x35124a of _0x7e145d){if(!$gameSwitches[_0x15360a(0x448)](_0x35124a))return![];}}if(_0x506935['anySwitchOn']){if(_0x15360a(0x4fa)!==_0x15360a(0x4fa))_0x2578f0[_0x15360a(0x520)]((_0x51af35,_0x208ad9)=>{const _0x1a8281=_0x15360a,_0x340519=_0x51af35['priority'],_0x22387c=_0x208ad9[_0x1a8281(0x51d)];if(_0x340519!==_0x22387c)return _0x22387c-_0x340519;return _0x51af35-_0x208ad9;});else{const _0x1ea9ea=_0x506935['anySwitchOn'];let _0x446fe9=!![];for(const _0x382ad2 of _0x1ea9ea){if($gameSwitches[_0x15360a(0x448)](_0x382ad2)){_0x446fe9=![];break;}}if(_0x446fe9)return![];}}if(_0x506935['allSwitchOff']){const _0x4300d5=_0x506935[_0x15360a(0x52d)];for(const _0x2079ec of _0x4300d5){if($gameSwitches[_0x15360a(0x448)](_0x2079ec))return![];}}if(_0x506935[_0x15360a(0x3d1)]){const _0x39117f=_0x506935[_0x15360a(0x3d1)];let _0x52a135=!![];for(const _0x5d0b70 of _0x39117f){if(!$gameSwitches['value'](_0x5d0b70)){_0x52a135=![];break;}}if(_0x52a135)return![];}return!![];},DataManager['getPassiveStateConditionSwitchData']=function(_0x14c3a7){const _0xbf2886=_0x54bc45;let _0x39e709={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x14c3a7)return _0x39e709;const _0x58d594=VisuMZ[_0xbf2886(0x24f)][_0xbf2886(0x513)](_0x14c3a7,_0xbf2886(0x1dc));this[_0xbf2886(0x32f)]=this[_0xbf2886(0x32f)]||{};if(this['_cache_getPassiveStateConditionSwitchData'][_0x58d594]!==undefined)return this[_0xbf2886(0x32f)][_0x58d594];const _0x14c6de=_0x14c3a7[_0xbf2886(0x20d)]||'';_0x14c6de[_0xbf2886(0x389)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)&&(_0x39e709['allSwitchOn']=String(RegExp['$1'])[_0xbf2886(0x350)](',')[_0xbf2886(0x2c7)](_0x4f7b40=>Number(_0x4f7b40)));_0x14c6de[_0xbf2886(0x389)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)&&(_0x39e709[_0xbf2886(0x3b7)]=String(RegExp['$1'])['split'](',')[_0xbf2886(0x2c7)](_0x4fc0b0=>Number(_0x4fc0b0)));if(_0x14c6de[_0xbf2886(0x389)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)){if(_0xbf2886(0x315)===_0xbf2886(0x41c)){if(typeof _0x3c0e56!=='number')_0x20826f=_0x118d60['id'];this[_0xbf2886(0x4bd)]=this[_0xbf2886(0x4bd)]||{},this[_0xbf2886(0x4bd)][_0x528b3c]=this['_stateOrigin'][_0x42874f]||_0xbf2886(0x4bc);const _0x41c0ea=this[_0xbf2886(0x4bd)][_0x4b0953];return this[_0xbf2886(0x34c)](_0x41c0ea);}else _0x39e709[_0xbf2886(0x52d)]=String(RegExp['$1'])['split'](',')[_0xbf2886(0x2c7)](_0x57b51b=>Number(_0x57b51b));}return _0x14c6de[_0xbf2886(0x389)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)&&(_0xbf2886(0x232)===_0xbf2886(0x232)?_0x39e709['anySwitchOff']=String(RegExp['$1'])['split'](',')[_0xbf2886(0x2c7)](_0x22b494=>Number(_0x22b494)):_0x5e63fc[_0xbf2886(0x24f)][_0xbf2886(0x429)]['States']['onAddStateJS'][_0xbf2886(0x462)](this,_0x2c907)),this[_0xbf2886(0x32f)][_0x58d594]=_0x39e709,this[_0xbf2886(0x32f)][_0x58d594];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x299)]=function(_0x1e267d){const _0x316c14=_0x54bc45,_0x39ad2e=VisuMZ['SkillsStatesCore']['statePassiveConditionJS'];if(_0x39ad2e[_0x1e267d['id']]&&!_0x39ad2e[_0x1e267d['id']][_0x316c14(0x462)](this,_0x1e267d))return![];return!![];},Game_BattlerBase['prototype'][_0x54bc45(0x402)]=function(_0x4beb20){const _0x28515a=_0x54bc45;return VisuMZ['SkillsStatesCore'][_0x28515a(0x429)][_0x28515a(0x314)][_0x28515a(0x497)][_0x28515a(0x462)](this,_0x4beb20);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4e5)]=function(){const _0x1efbe4=_0x54bc45;if(this[_0x1efbe4(0x3ee)]('passiveStates'))return this[_0x1efbe4(0x46b)]();if(this[_0x1efbe4(0x2cc)])return[];return this[_0x1efbe4(0x2cc)]=!![],this[_0x1efbe4(0x32d)](),this[_0x1efbe4(0x2cc)]=undefined,this[_0x1efbe4(0x46b)]();},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x32d)]=function(){const _0xdb18a2=_0x54bc45;this[_0xdb18a2(0x2cc)]=!![],this['_cache'][_0xdb18a2(0x4e5)]=[],this[_0xdb18a2(0x24d)](),this[_0xdb18a2(0x33f)](),this[_0xdb18a2(0x4dd)](),this[_0xdb18a2(0x4d6)][_0xdb18a2(0x4e5)]=this[_0xdb18a2(0x4d6)][_0xdb18a2(0x4e5)][_0xdb18a2(0x520)]((_0x428cf5,_0x511282)=>_0x428cf5-_0x511282),this[_0xdb18a2(0x2cc)]=undefined;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x24d)]=function(){const _0x46ce94=_0x54bc45;if(Imported[_0x46ce94(0x3df)])this[_0x46ce94(0x50e)]();},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x37f)]=function(){return[];},Game_BattlerBase['prototype']['addPassiveStatesByNotetag']=function(){const _0x1e2f48=_0x54bc45,_0x31acb5=this[_0x1e2f48(0x37f)]();for(const _0x45c335 of _0x31acb5){if(!_0x45c335)continue;const _0x194850=DataManager[_0x1e2f48(0x221)](_0x45c335);for(const _0xd2034e of _0x194850){this[_0x1e2f48(0x4d6)][_0x1e2f48(0x4e5)][_0x1e2f48(0x3d2)](_0xd2034e);}}},DataManager[_0x54bc45(0x221)]=function(_0x59f583){const _0x54e022=_0x54bc45;if(!_0x59f583)return[];const _0x4510a1=VisuMZ[_0x54e022(0x24f)][_0x54e022(0x513)](_0x59f583,'passiveStateIDs');this[_0x54e022(0x2a7)]=this['_cache_getPassiveStatesFromObj']||{};if(this['_cache_getPassiveStatesFromObj'][_0x4510a1]!==undefined)return this[_0x54e022(0x2a7)][_0x4510a1];const _0x3ab7b5=[],_0x3dd8c6=_0x59f583['note']||'',_0x1c2771=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x1e71f7=_0x3dd8c6[_0x54e022(0x389)](_0x1c2771);if(_0x1e71f7){if(_0x54e022(0x2e9)!==_0x54e022(0x2e9))_0x35c597=_0x3bd514(_0x178f56['$1']),_0xbcaae1=_0x15fab0(_0x3cbfce['$2']);else for(const _0x572235 of _0x1e71f7){if('kMJWF'===_0x54e022(0x2d9)){_0x572235[_0x54e022(0x389)](_0x1c2771);const _0x449cc7=String(RegExp['$1'])[_0x54e022(0x350)](',')[_0x54e022(0x2c7)](_0x400d60=>_0x400d60[_0x54e022(0x36a)]());for(const _0x1821e2 of _0x449cc7){if(_0x54e022(0x25b)==='kKlCs'){const _0x267304=/^\d+$/[_0x54e022(0x4ed)](_0x1821e2);let _0x5b1eb7=0x0;if(_0x267304)_0x5b1eb7=Number(_0x1821e2);else{if(_0x54e022(0x3bc)!==_0x54e022(0x3bc))return _0x4b4b02[_0x54e022(0x28d)]()-0x2;else _0x5b1eb7=DataManager[_0x54e022(0x31f)](_0x1821e2);}_0x5b1eb7&&(_0x54e022(0x516)===_0x54e022(0x516)?_0x3ab7b5[_0x54e022(0x3d2)](_0x5b1eb7):this[_0x54e022(0x330)]=_0x54b366);}else{const _0x40531c=_0x20a492[_0x54e022(0x20d)];if(_0x86ed2c==='death'&&_0x40531c[_0x54e022(0x389)](/<NO DEATH CLEAR>/i))return![];if(_0x4af6b7===_0x54e022(0x2ca)&&_0x40531c[_0x54e022(0x389)](/<NO RECOVER ALL CLEAR>/i))return![];}}}else return _0x5baf85(_0x3b9f89['$1']);}}return this['_cache_getPassiveStatesFromObj'][_0x4510a1]=_0x3ab7b5,this[_0x54e022(0x2a7)][_0x4510a1];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4dd)]=function(){const _0xc3fe9=_0x54bc45,_0xce178d=VisuMZ['SkillsStatesCore'][_0xc3fe9(0x429)][_0xc3fe9(0x314)][_0xc3fe9(0x23b)];this['_cache']['passiveStates']=this[_0xc3fe9(0x4d6)]['passiveStates'][_0xc3fe9(0x42f)](_0xce178d);},Game_BattlerBase['prototype']['stateTurns']=function(_0x57d801){const _0x25d004=_0x54bc45;if(typeof _0x57d801!=='number')_0x57d801=_0x57d801['id'];return this[_0x25d004(0x1f9)][_0x57d801]||0x0;},Game_BattlerBase[_0x54bc45(0x4ff)]['setStateTurns']=function(_0x5baabc,_0x466c6c){const _0x3dcec3=_0x54bc45;if(typeof _0x5baabc!==_0x3dcec3(0x2cd))_0x5baabc=_0x5baabc['id'];if(this['isStateAffected'](_0x5baabc)){const _0x1fc6c1=DataManager[_0x3dcec3(0x4d7)](_0x5baabc);this[_0x3dcec3(0x1f9)][_0x5baabc]=_0x466c6c[_0x3dcec3(0x36f)](0x0,_0x1fc6c1);if(this[_0x3dcec3(0x1f9)][_0x5baabc]<=0x0)this['removeState'](_0x5baabc);}},Game_BattlerBase['prototype'][_0x54bc45(0x3de)]=function(_0x196c7f,_0x3096f9){const _0x1bd566=_0x54bc45;if(typeof _0x196c7f!=='number')_0x196c7f=_0x196c7f['id'];if(this['isStateAffected'](_0x196c7f)){if(_0x1bd566(0x4d5)!==_0x1bd566(0x4d5))return!![];else _0x3096f9+=this['stateTurns'](_0x196c7f),this['setStateTurns'](_0x196c7f,_0x3096f9);}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x456)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x323)],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x323)]=function(_0xb2a93d){const _0x21a2e8=_0x54bc45,_0x3d3093=this[_0x21a2e8(0x250)][_0xb2a93d];VisuMZ[_0x21a2e8(0x24f)][_0x21a2e8(0x456)]['call'](this,_0xb2a93d);if(_0x3d3093>0x0)this['onEraseBuff'](_0xb2a93d);if(_0x3d3093<0x0)this[_0x21a2e8(0x357)](_0xb2a93d);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x4b6)]=Game_BattlerBase['prototype']['increaseBuff'],Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x488)]=function(_0x513e55){const _0x3c9fbd=_0x54bc45;VisuMZ[_0x3c9fbd(0x24f)][_0x3c9fbd(0x4b6)]['call'](this,_0x513e55);if(!this[_0x3c9fbd(0x255)](_0x513e55))this['eraseBuff'](_0x513e55);},VisuMZ['SkillsStatesCore'][_0x54bc45(0x27a)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x508)],Game_BattlerBase[_0x54bc45(0x4ff)]['decreaseBuff']=function(_0x4dc701){const _0xcb3c76=_0x54bc45;VisuMZ[_0xcb3c76(0x24f)]['Game_BattlerBase_decreaseBuff'][_0xcb3c76(0x462)](this,_0x4dc701);if(!this[_0xcb3c76(0x255)](_0x4dc701))this['eraseBuff'](_0x4dc701);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x379)]=function(_0x275826){},Game_BattlerBase['prototype']['onEraseDebuff']=function(_0x2154f6){},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3e2)]=function(_0x9d7640){const _0x4a1847=_0x54bc45;return this['_buffs'][_0x9d7640]===VisuMZ[_0x4a1847(0x24f)]['Settings'][_0x4a1847(0x21e)][_0x4a1847(0x2c0)];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x320)]=function(_0x14c093){const _0x40d650=_0x54bc45;return this['_buffs'][_0x14c093]===-VisuMZ[_0x40d650(0x24f)][_0x40d650(0x429)]['Buffs']['StackDebuffMax'];},VisuMZ['SkillsStatesCore'][_0x54bc45(0x44f)]=Game_BattlerBase[_0x54bc45(0x4ff)]['buffIconIndex'],Game_BattlerBase['prototype'][_0x54bc45(0x30f)]=function(_0x180f65,_0x2522ee){const _0x2159f7=_0x54bc45;return _0x180f65=_0x180f65[_0x2159f7(0x36f)](-0x2,0x2),VisuMZ[_0x2159f7(0x24f)][_0x2159f7(0x44f)][_0x2159f7(0x462)](this,_0x180f65,_0x2522ee);},Game_BattlerBase['prototype'][_0x54bc45(0x2bc)]=function(_0x1c21db){const _0x48149d=_0x54bc45,_0x76a520=this[_0x48149d(0x250)][_0x1c21db];return VisuMZ[_0x48149d(0x24f)]['Settings']['Buffs'][_0x48149d(0x461)]['call'](this,_0x1c21db,_0x76a520);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4b1)]=function(_0x1b32e9){const _0x475661=_0x54bc45;return this[_0x475661(0x322)][_0x1b32e9]||0x0;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x49e)]=function(_0x2c4c33){const _0x2aa3fb=_0x54bc45;return this[_0x2aa3fb(0x4b1)](_0x2c4c33);},Game_BattlerBase['prototype'][_0x54bc45(0x3f8)]=function(_0x2ba17d,_0x95fa86){const _0x533c53=_0x54bc45;if(this['isBuffAffected'](_0x2ba17d)){const _0x424797=VisuMZ[_0x533c53(0x24f)][_0x533c53(0x429)][_0x533c53(0x21e)][_0x533c53(0x263)];this[_0x533c53(0x322)][_0x2ba17d]=_0x95fa86[_0x533c53(0x36f)](0x0,_0x424797);}},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x3b1)]=function(_0x58ad7e,_0x53cd7d){const _0x527d6c=_0x54bc45;this[_0x527d6c(0x1db)](_0x58ad7e)&&(_0x53cd7d+=this[_0x527d6c(0x4b1)](stateId),this[_0x527d6c(0x3f8)](_0x58ad7e,_0x53cd7d));},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2c1)]=function(_0x124b6a,_0x26752c){const _0x31ea34=_0x54bc45;if(this[_0x31ea34(0x4c9)](_0x124b6a)){const _0x3a2813=VisuMZ[_0x31ea34(0x24f)][_0x31ea34(0x429)][_0x31ea34(0x21e)]['MaxTurns'];this[_0x31ea34(0x322)][_0x124b6a]=_0x26752c[_0x31ea34(0x36f)](0x0,_0x3a2813);}},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x470)]=function(_0xd4b0a5,_0x269894){const _0x29244f=_0x54bc45;this['isDebuffAffected'](_0xd4b0a5)&&('wGviB'!==_0x29244f(0x4f4)?(_0x269894+=this['buffTurns'](stateId),this[_0x29244f(0x2c1)](_0xd4b0a5,_0x269894)):_0x13f535=_0x57cb62['concat'](this[_0x29244f(0x2f8)]()[_0x29244f(0x2a5)](_0x3eb53e=>_0x3eb53e['isGroupDefeatStateAffected']())));},Game_BattlerBase['prototype'][_0x54bc45(0x4cf)]=function(_0x59460c){const _0x46c37a=_0x54bc45;if(typeof _0x59460c!==_0x46c37a(0x2cd))_0x59460c=_0x59460c['id'];return this[_0x46c37a(0x26b)]=this[_0x46c37a(0x26b)]||{},this['_stateData'][_0x59460c]=this[_0x46c37a(0x26b)][_0x59460c]||{},this[_0x46c37a(0x26b)][_0x59460c];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x366)]=function(_0x12e50f,_0xe5485b){const _0x49da38=_0x54bc45;if(typeof _0x12e50f!==_0x49da38(0x2cd))_0x12e50f=_0x12e50f['id'];const _0x126716=this[_0x49da38(0x4cf)](_0x12e50f);return _0x126716[_0xe5485b];},Game_BattlerBase[_0x54bc45(0x4ff)]['setStateData']=function(_0x5ca91c,_0x26af28,_0x4dbc65){const _0x223918=_0x54bc45;if(typeof _0x5ca91c!=='number')_0x5ca91c=_0x5ca91c['id'];const _0x2597bb=this[_0x223918(0x4cf)](_0x5ca91c);_0x2597bb[_0x26af28]=_0x4dbc65;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x515)]=function(_0x4b7fd8){const _0x4ffaa1=_0x54bc45;if(typeof _0x4b7fd8!=='number')_0x4b7fd8=_0x4b7fd8['id'];this[_0x4ffaa1(0x26b)]=this[_0x4ffaa1(0x26b)]||{},this[_0x4ffaa1(0x26b)][_0x4b7fd8]={};},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x326)]=function(_0x1e47d9){const _0x38c968=_0x54bc45;if(typeof _0x1e47d9!=='number')_0x1e47d9=_0x1e47d9['id'];return this[_0x38c968(0x399)]=this[_0x38c968(0x399)]||{},this[_0x38c968(0x399)][_0x1e47d9]===undefined&&(this[_0x38c968(0x399)][_0x1e47d9]=''),this[_0x38c968(0x399)][_0x1e47d9];},Game_BattlerBase['prototype'][_0x54bc45(0x3ba)]=function(_0x40785d,_0x546aaf){const _0x204f3a=_0x54bc45;if(typeof _0x40785d!==_0x204f3a(0x2cd))_0x40785d=_0x40785d['id'];this['_stateDisplay']=this[_0x204f3a(0x399)]||{},this[_0x204f3a(0x399)][_0x40785d]=_0x546aaf;},Game_BattlerBase[_0x54bc45(0x4ff)]['clearStateDisplay']=function(_0x3bd5bb){const _0x4ae38f=_0x54bc45;if(typeof _0x3bd5bb!=='number')_0x3bd5bb=_0x3bd5bb['id'];this['_stateDisplay']=this['_stateDisplay']||{},this[_0x4ae38f(0x399)][_0x3bd5bb]='';},Game_BattlerBase[_0x54bc45(0x4ff)]['getStateOrigin']=function(_0x1573ac){const _0x123492=_0x54bc45;if(typeof _0x1573ac!==_0x123492(0x2cd))_0x1573ac=_0x1573ac['id'];this['_stateOrigin']=this[_0x123492(0x4bd)]||{},this[_0x123492(0x4bd)][_0x1573ac]=this['_stateOrigin'][_0x1573ac]||_0x123492(0x4bc);const _0xdf0bcb=this[_0x123492(0x4bd)][_0x1573ac];return this[_0x123492(0x34c)](_0xdf0bcb);},Game_BattlerBase['prototype'][_0x54bc45(0x355)]=function(_0x24e10a,_0x4928ee){const _0xc80458=_0x54bc45;this['_stateOrigin']=this[_0xc80458(0x4bd)]||{};const _0x45c102=_0x4928ee?this[_0xc80458(0x4da)](_0x4928ee):this[_0xc80458(0x244)]();this[_0xc80458(0x4bd)][_0x24e10a]=_0x45c102;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x478)]=function(_0xb8b274){const _0x15f8b4=_0x54bc45;this[_0x15f8b4(0x4bd)]=this[_0x15f8b4(0x4bd)]||{},delete this['_stateOrigin'][_0xb8b274];},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x377)]=function(){const _0x62b066=_0x54bc45;this[_0x62b066(0x4bd)]={};},Game_BattlerBase['prototype']['getCurrentStateOriginKey']=function(){const _0x3f3b25=_0x54bc45,_0x599be2=this['getCurrentStateActiveUser']();return this[_0x3f3b25(0x4da)](_0x599be2);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x404)]=function(){const _0x415b66=_0x54bc45;if($gameParty[_0x415b66(0x48e)]()){if(BattleManager[_0x415b66(0x482)])return BattleManager[_0x415b66(0x482)];else{if(BattleManager[_0x415b66(0x4a2)]){if(_0x415b66(0x293)!=='RZXzY'){const _0x1d38c1=_0x415b66(0x258)[_0x415b66(0x47a)](_0x11ffed[_0x415b66(0x396)]()),_0xcfb130='<member-%1>'['format'](_0x54aa05[_0x415b66(0x325)]()),_0x2499f3=_0x415b66(0x3b4)[_0x415b66(0x47a)](_0x19d2a2['getCurrentTroopUniqueID']());return _0x415b66(0x38f)[_0x415b66(0x47a)](_0x1d38c1,_0xcfb130,_0x2499f3);}else return BattleManager['_currentActor'];}}}else{if('rfyxf'!==_0x415b66(0x3bf))this[_0x415b66(0x483)](_0x4db08f);else{const _0x212737=SceneManager[_0x415b66(0x23d)];if(![Scene_Map,Scene_Item][_0x415b66(0x358)](_0x212737[_0x415b66(0x4c2)])){if(_0x415b66(0x40f)===_0x415b66(0x40f))return $gameParty['menuActor']();else this[_0x415b66(0x4c4)](),_0x5c13eb[_0x415b66(0x24f)][_0x415b66(0x217)]['call'](this);}}}return this;},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4da)]=function(_0x107332){const _0x485d47=_0x54bc45;if(!_0x107332)return'user';if(_0x107332[_0x485d47(0x485)]()){if(_0x485d47(0x2b1)!=='rUgCt')return _0x485d47(0x3d4)[_0x485d47(0x47a)](_0x107332['actorId']());else this[_0x485d47(0x410)]()!==''?this[_0x485d47(0x3a9)]():(_0x33892a['SkillsStatesCore'][_0x485d47(0x421)][_0x485d47(0x462)](this),this['initMembersSkillsStatesCore']());}else{const _0xd60d4=_0x485d47(0x258)[_0x485d47(0x47a)](_0x107332[_0x485d47(0x396)]()),_0x324094=_0x485d47(0x38a)[_0x485d47(0x47a)](_0x107332[_0x485d47(0x325)]()),_0x196bb4='<troop-%1>'['format']($gameTroop[_0x485d47(0x534)]());return _0x485d47(0x38f)['format'](_0xd60d4,_0x324094,_0x196bb4);}return'user';},Game_BattlerBase[_0x54bc45(0x4ff)]['getStateOriginByKey']=function(_0x48f6f2){const _0x424c03=_0x54bc45;if(_0x48f6f2==='user')return this;else{if(_0x48f6f2[_0x424c03(0x389)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty[_0x424c03(0x48e)]()&&_0x48f6f2[_0x424c03(0x389)](/<troop-(\d+)>/i)){const _0x6504da=Number(RegExp['$1']);if(_0x6504da===$gameTroop[_0x424c03(0x534)]()){if(_0x48f6f2[_0x424c03(0x389)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x48f6f2['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore']['Game_Battler_addState']=Game_Battler['prototype'][_0x54bc45(0x4ea)],Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x4ea)]=function(_0x37581b){const _0x409394=_0x54bc45,_0x4c7a6e=this[_0x409394(0x2ae)](_0x37581b);VisuMZ['SkillsStatesCore']['Game_Battler_addState'][_0x409394(0x462)](this,_0x37581b);if(_0x4c7a6e&&this[_0x409394(0x29f)]($dataStates[_0x37581b])){this[_0x409394(0x2a1)](_0x37581b);;}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2b6)]=Game_Battler['prototype']['isStateAddable'],Game_Battler['prototype']['isStateAddable']=function(_0x416701){const _0x462a99=_0x54bc45,_0x36147e=$dataStates[_0x416701];if(_0x36147e&&_0x36147e[_0x462a99(0x20d)][_0x462a99(0x389)](/<NO DEATH CLEAR>/i))return!this[_0x462a99(0x306)](_0x416701)&&!this[_0x462a99(0x3ad)](_0x416701)&&!this[_0x462a99(0x503)][_0x462a99(0x341)](_0x416701);return VisuMZ[_0x462a99(0x24f)]['Game_Battler_isStateAddable'][_0x462a99(0x462)](this,_0x416701);},Game_Battler['prototype'][_0x54bc45(0x2a1)]=function(_0xe260bd){const _0x29ae5d=_0x54bc45;this[_0x29ae5d(0x355)](_0xe260bd),this[_0x29ae5d(0x2a0)](_0xe260bd),this[_0x29ae5d(0x234)](_0xe260bd),this['onAddStateCustomJS'](_0xe260bd),this[_0x29ae5d(0x3f2)](_0xe260bd);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x370)]=function(_0x3438f5){const _0xb3b7f0=_0x54bc45;this[_0xb3b7f0(0x32b)](_0x3438f5),this[_0xb3b7f0(0x301)](_0x3438f5),Game_BattlerBase[_0xb3b7f0(0x4ff)][_0xb3b7f0(0x370)]['call'](this,_0x3438f5);},Game_Battler[_0x54bc45(0x4ff)]['removeStatesAuto']=function(_0x112ea5){const _0x1e37db=_0x54bc45;for(const _0x4476f7 of this[_0x1e37db(0x274)]()){this[_0x1e37db(0x289)](_0x4476f7['id'])&&_0x4476f7['autoRemovalTiming']===_0x112ea5&&(this[_0x1e37db(0x220)](_0x4476f7['id']),this[_0x1e37db(0x39a)](_0x4476f7['id']),this[_0x1e37db(0x3a0)](_0x4476f7['id']));}},Game_Battler[_0x54bc45(0x4ff)]['onExpireState']=function(_0x45c1c5){this['onExpireStateCustomJS'](_0x45c1c5);},Game_Battler[_0x54bc45(0x4ff)]['onAddStateCustomJS']=function(_0x42eec5){const _0x4658e1=_0x54bc45;if(this[_0x4658e1(0x2ab)]||this[_0x4658e1(0x2f2)])return;const _0x31e7d2=VisuMZ[_0x4658e1(0x24f)][_0x4658e1(0x2ad)];if(_0x31e7d2[_0x42eec5])_0x31e7d2[_0x42eec5][_0x4658e1(0x462)](this,_0x42eec5);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x32b)]=function(_0x3474b7){const _0x19eb11=_0x54bc45;if(this[_0x19eb11(0x2ab)]||this[_0x19eb11(0x2f2)])return;const _0x2a2750=VisuMZ['SkillsStatesCore'][_0x19eb11(0x521)];if(_0x2a2750[_0x3474b7])_0x2a2750[_0x3474b7][_0x19eb11(0x462)](this,_0x3474b7);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x3be)]=function(_0x4626ad){const _0x3b6e3f=_0x54bc45;if(this[_0x3b6e3f(0x2ab)]||this[_0x3b6e3f(0x2f2)])return;const _0x5e4764=VisuMZ[_0x3b6e3f(0x24f)][_0x3b6e3f(0x51e)];if(_0x5e4764[_0x4626ad])_0x5e4764[_0x4626ad][_0x3b6e3f(0x462)](this,_0x4626ad);},Game_Battler['prototype'][_0x54bc45(0x3f2)]=function(_0x561f10){const _0x551c60=_0x54bc45;if(this[_0x551c60(0x2ab)]||this[_0x551c60(0x2f2)])return;try{'iVBKy'!==_0x551c60(0x442)?VisuMZ[_0x551c60(0x24f)][_0x551c60(0x429)][_0x551c60(0x24e)][_0x551c60(0x287)][_0x551c60(0x462)](this,_0x561f10):_0x455c2e=_0x29992d['GroupDigits'](_0x51d168);}catch(_0x56e500){if($gameTemp[_0x551c60(0x528)]())console[_0x551c60(0x3ef)](_0x56e500);}},Game_Battler[_0x54bc45(0x4ff)]['onEraseStateGlobalJS']=function(_0x1dcb4d){const _0x23c3d0=_0x54bc45;if(this[_0x23c3d0(0x2ab)]||this[_0x23c3d0(0x2f2)])return;try{VisuMZ[_0x23c3d0(0x24f)][_0x23c3d0(0x429)]['States'][_0x23c3d0(0x1f3)][_0x23c3d0(0x462)](this,_0x1dcb4d);}catch(_0x5d7d11){if($gameTemp['isPlaytest']())console['log'](_0x5d7d11);}},Game_Battler['prototype'][_0x54bc45(0x3a0)]=function(_0x15a1cb){const _0x551b5d=_0x54bc45;if(this[_0x551b5d(0x2ab)]||this[_0x551b5d(0x2f2)])return;try{VisuMZ[_0x551b5d(0x24f)][_0x551b5d(0x429)][_0x551b5d(0x24e)][_0x551b5d(0x349)][_0x551b5d(0x462)](this,_0x15a1cb);}catch(_0x1b37c5){if(_0x551b5d(0x491)!==_0x551b5d(0x502)){if($gameTemp[_0x551b5d(0x528)]())console[_0x551b5d(0x3ef)](_0x1b37c5);}else{if(typeof _0x3568e1!==_0x551b5d(0x2cd))_0x11677d=_0x1d697e['id'];this['_stateDisplay']=this[_0x551b5d(0x399)]||{},this[_0x551b5d(0x399)][_0x90b78d]='';}}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x359)]=function(_0x484efd){const _0x129242=_0x54bc45;return _0x484efd=_0x484efd['toUpperCase']()[_0x129242(0x36a)](),this[_0x129242(0x274)]()[_0x129242(0x2a5)](_0x122d49=>_0x122d49['categories'][_0x129242(0x358)](_0x484efd));},Game_Battler['prototype'][_0x54bc45(0x1dd)]=function(_0x54dd24,_0x6c533c){const _0x1a3d4e=_0x54bc45;_0x54dd24=_0x54dd24['toUpperCase']()[_0x1a3d4e(0x36a)](),_0x6c533c=_0x6c533c||0x0;const _0x1e190d=this['statesByCategory'](_0x54dd24),_0x136c1e=[];for(const _0x2c5db8 of _0x1e190d){if(_0x1a3d4e(0x36b)!==_0x1a3d4e(0x472)){if(!_0x2c5db8)continue;if(_0x6c533c<=0x0)break;_0x136c1e[_0x1a3d4e(0x3d2)](_0x2c5db8['id']),this[_0x1a3d4e(0x503)][_0x1a3d4e(0x335)]=!![],_0x6c533c--;}else return _0x1a3d4e(0x1f0);}while(_0x136c1e[_0x1a3d4e(0x413)]>0x0){this[_0x1a3d4e(0x220)](_0x136c1e['shift']());}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x2b0)]=function(_0x4dca96,_0x26222d){const _0x194fd1=_0x54bc45;_0x4dca96=_0x4dca96[_0x194fd1(0x41d)]()[_0x194fd1(0x36a)](),_0x26222d=_0x26222d||[];const _0x5c2faf=this[_0x194fd1(0x359)](_0x4dca96),_0x2dde74=[];for(const _0x2dd6b0 of _0x5c2faf){if(_0x194fd1(0x4aa)!==_0x194fd1(0x4aa)){_0x4fb31e[_0x194fd1(0x389)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5f486b=_0x28917b[_0x194fd1(0x336)](_0x48bc98(_0x22eb39['$1'])[_0x194fd1(0x41d)]()),_0xd3ad1f=_0xe226cb(_0x23bf34['$2']);_0x5f486b>=0x0&&(_0x1460f5[_0x194fd1(0x3b1)](_0x5f486b,_0xd3ad1f),this[_0x194fd1(0x4a9)](_0x1d7d39));}else{if(!_0x2dd6b0)continue;if(_0x26222d[_0x194fd1(0x358)](_0x2dd6b0))continue;_0x2dde74[_0x194fd1(0x3d2)](_0x2dd6b0['id']),this[_0x194fd1(0x503)][_0x194fd1(0x335)]=!![];}}while(_0x2dde74[_0x194fd1(0x413)]>0x0){this[_0x194fd1(0x220)](_0x2dde74[_0x194fd1(0x4de)]());}},Game_Battler['prototype'][_0x54bc45(0x2d5)]=function(_0x11dda2){const _0x50851d=_0x54bc45;return this[_0x50851d(0x2c2)](_0x11dda2)>0x0;},Game_Battler['prototype']['hasStateCategory']=function(_0x7807ce){return this['totalStateCategory'](_0x7807ce)>0x0;},Game_Battler[_0x54bc45(0x4ff)]['totalStateCategoryAffected']=function(_0x5e13c3){const _0x3d50b5=_0x54bc45,_0x1baf32=this[_0x3d50b5(0x359)](_0x5e13c3)['filter'](_0x4104af=>this[_0x3d50b5(0x2f0)](_0x4104af['id']));return _0x1baf32[_0x3d50b5(0x413)];},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x222)]=function(_0x33456b){const _0x59f06a=_0x54bc45,_0x229648=this[_0x59f06a(0x359)](_0x33456b);return _0x229648[_0x59f06a(0x413)];},VisuMZ['SkillsStatesCore'][_0x54bc45(0x3d3)]=Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x306)],Game_BattlerBase['prototype'][_0x54bc45(0x306)]=function(_0x5c5835){const _0x4c4bed=_0x54bc45,_0x35c23d=$dataStates[_0x5c5835];if(_0x35c23d&&_0x35c23d[_0x4c4bed(0x518)][_0x4c4bed(0x413)]>0x0){if(_0x4c4bed(0x45b)===_0x4c4bed(0x45b))for(const _0x47d924 of _0x35c23d[_0x4c4bed(0x518)]){if(this[_0x4c4bed(0x4fd)](_0x47d924))return!![];}else{if(_0x69a98e[_0x4c4bed(0x448)](_0x198b1c))return![];}}return VisuMZ[_0x4c4bed(0x24f)][_0x4c4bed(0x3d3)][_0x4c4bed(0x462)](this,_0x5c5835);},Game_BattlerBase[_0x54bc45(0x4ff)]['isStateCategoryResisted']=function(_0x5b1118){const _0x419f0e=_0x54bc45;let _0x2a1fed='stateCategoriesResisted';if(this[_0x419f0e(0x3ee)](_0x2a1fed))return this[_0x419f0e(0x4d6)][_0x2a1fed][_0x419f0e(0x358)](_0x5b1118);return this['_cache'][_0x2a1fed]=this['makeResistedStateCategories'](),this[_0x419f0e(0x4d6)][_0x2a1fed]['includes'](_0x5b1118);},Game_BattlerBase[_0x54bc45(0x4ff)]['makeResistedStateCategories']=function(){const _0x485ae7=_0x54bc45,_0x54ca7e=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0xdb5bb=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x4569c2=[];for(const _0xcee9c0 of this[_0x485ae7(0x43a)]()){if(!_0xcee9c0)continue;const _0x387fd7=_0xcee9c0[_0x485ae7(0x20d)],_0x3ec0fd=_0x387fd7[_0x485ae7(0x389)](_0x54ca7e);if(_0x3ec0fd)for(const _0x16491e of _0x3ec0fd){if('diJLJ'===_0x485ae7(0x360)){const _0x12e551=_0x4dc92f['getStypeIdWithName'](_0x442916);if(_0x12e551)this[_0x485ae7(0x210)][_0x200754['id']][_0x485ae7(0x3d2)](_0x12e551);}else{_0x16491e[_0x485ae7(0x389)](_0x54ca7e);const _0x503552=String(RegExp['$1'])[_0x485ae7(0x350)](',')[_0x485ae7(0x2c7)](_0x5da6fb=>String(_0x5da6fb)[_0x485ae7(0x41d)]()['trim']());_0x4569c2=_0x4569c2[_0x485ae7(0x42f)](_0x503552);}}if(_0x387fd7[_0x485ae7(0x389)](_0xdb5bb)){const _0x1e419b=String(RegExp['$1'])[_0x485ae7(0x350)](/[\r\n]+/)[_0x485ae7(0x2c7)](_0x2975e5=>String(_0x2975e5)[_0x485ae7(0x41d)]()[_0x485ae7(0x36a)]());_0x4569c2=_0x4569c2['concat'](_0x1e419b);}}return _0x4569c2;},Game_BattlerBase[_0x54bc45(0x4ff)]['removeOtherStatesOfSameCategory']=function(_0x210720){const _0x210eab=_0x54bc45,_0x34c641=$dataStates[_0x210720];if(!_0x34c641)return;const _0x13ce29=_0x34c641[_0x210eab(0x20d)]||'',_0x126a57=_0x13ce29[_0x210eab(0x389)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x126a57){if(_0x210eab(0x4ec)!==_0x210eab(0x4ec))this[_0x210eab(0x1e8)]['textColor']=_0x801b9f;else{const _0x33f536=[_0x34c641];for(const _0x1b5576 of _0x126a57){if(_0x210eab(0x390)==='gbOMR'){_0x1b5576[_0x210eab(0x389)](/<REMOVE OTHER (.*) STATES>/i);const _0x368eba=String(RegExp['$1']);this[_0x210eab(0x2b0)](_0x368eba,_0x33f536);}else for(const _0x1ed0ba of _0x4f0989){_0x1ed0ba['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x4ee43b=_0x2da090(_0x5ef903['$1'])[_0x210eab(0x41d)]()[_0x210eab(0x36a)]()[_0x210eab(0x350)](',');for(const _0x556291 of _0x4ee43b){_0x57f3ad[_0x210eab(0x518)][_0x210eab(0x3d2)](_0x556291['trim']());}}}}}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x3c3)]=Game_Battler[_0x54bc45(0x4ff)]['addBuff'],Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x4ee)]=function(_0x190e73,_0x4ab0e9){const _0x2a1829=_0x54bc45;VisuMZ[_0x2a1829(0x24f)][_0x2a1829(0x3c3)][_0x2a1829(0x462)](this,_0x190e73,_0x4ab0e9);if(this[_0x2a1829(0x1db)](_0x190e73)){if(_0x2a1829(0x378)!==_0x2a1829(0x1de))this[_0x2a1829(0x445)](_0x190e73,_0x4ab0e9);else return _0x46d335[_0x2a1829(0x4ff)][_0x2a1829(0x3a3)]['call'](this);}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x36e)]=function(_0x3c5181){},VisuMZ[_0x54bc45(0x24f)]['Game_Battler_addDebuff']=Game_Battler['prototype'][_0x54bc45(0x20f)],Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x20f)]=function(_0x568dda,_0x1e3051){const _0x4efd76=_0x54bc45;VisuMZ[_0x4efd76(0x24f)][_0x4efd76(0x45a)][_0x4efd76(0x462)](this,_0x568dda,_0x1e3051),this[_0x4efd76(0x4c9)](_0x568dda)&&this[_0x4efd76(0x239)](_0x568dda,_0x1e3051);},Game_Battler[_0x54bc45(0x4ff)]['removeBuffsAuto']=function(){const _0x2fd8d4=_0x54bc45;for(let _0xd92ad7=0x0;_0xd92ad7<this['buffLength']();_0xd92ad7++){if(_0x2fd8d4(0x240)!=='ttNRs'){if(this[_0x2fd8d4(0x2ab)]||this['_tempBattler'])return;const _0x569370=_0xaccf38[_0x2fd8d4(0x24f)][_0x2fd8d4(0x51e)];if(_0x569370[_0x58220f])_0x569370[_0x20702b]['call'](this,_0x13f3e3);}else{if(this[_0x2fd8d4(0x3c9)](_0xd92ad7)){const _0x34d685=this[_0x2fd8d4(0x250)][_0xd92ad7];this[_0x2fd8d4(0x3e7)](_0xd92ad7);if(_0x34d685>0x0)this[_0x2fd8d4(0x24a)](_0xd92ad7);if(_0x34d685<0x0)this[_0x2fd8d4(0x30b)](_0xd92ad7);}}}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x445)]=function(_0x249434,_0x4958cb){const _0x12b2b7=_0x54bc45;this[_0x12b2b7(0x39b)](_0x249434,_0x4958cb);},Game_Battler['prototype']['onAddDebuff']=function(_0x3bb0d7,_0x1c2503){this['onAddDebuffGlobalJS'](_0x3bb0d7,_0x1c2503);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x379)]=function(_0xdb2c94){const _0x2fd414=_0x54bc45;Game_BattlerBase[_0x2fd414(0x4ff)][_0x2fd414(0x379)][_0x2fd414(0x462)](this,_0xdb2c94),this[_0x2fd414(0x4b7)](_0xdb2c94);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x357)]=function(_0x6dc791){const _0x1aa1df=_0x54bc45;Game_BattlerBase[_0x1aa1df(0x4ff)]['onEraseDebuff'][_0x1aa1df(0x462)](this,_0x6dc791),this[_0x1aa1df(0x2a9)](_0x6dc791);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x24a)]=function(_0x59da97){const _0x8e712b=_0x54bc45;this[_0x8e712b(0x443)](_0x59da97);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x30b)]=function(_0x45b253){const _0x595010=_0x54bc45;this[_0x595010(0x4d8)](_0x45b253);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x39b)]=function(_0x5d831d,_0x1c8028){const _0x516813=_0x54bc45;VisuMZ[_0x516813(0x24f)][_0x516813(0x429)]['Buffs']['onAddBuffJS'][_0x516813(0x462)](this,_0x5d831d,_0x1c8028);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x362)]=function(_0x26bf11,_0x2f5869){const _0x2ca135=_0x54bc45;VisuMZ[_0x2ca135(0x24f)][_0x2ca135(0x429)]['Buffs']['onAddDebuffJS'][_0x2ca135(0x462)](this,_0x26bf11,_0x2f5869);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x4b7)]=function(_0x455c56){const _0x2c9fca=_0x54bc45;VisuMZ[_0x2c9fca(0x24f)][_0x2c9fca(0x429)][_0x2c9fca(0x21e)][_0x2c9fca(0x42a)][_0x2c9fca(0x462)](this,_0x455c56);},Game_BattlerBase[_0x54bc45(0x4ff)][_0x54bc45(0x2a9)]=function(_0x5457ea){const _0x3df07c=_0x54bc45;VisuMZ[_0x3df07c(0x24f)][_0x3df07c(0x429)][_0x3df07c(0x21e)][_0x3df07c(0x27b)][_0x3df07c(0x462)](this,_0x5457ea);},Game_Battler[_0x54bc45(0x4ff)]['onExpireBuffGlobalJS']=function(_0x32e7da){const _0xe2ce47=_0x54bc45;VisuMZ[_0xe2ce47(0x24f)]['Settings'][_0xe2ce47(0x21e)][_0xe2ce47(0x48d)][_0xe2ce47(0x462)](this,_0x32e7da);},Game_Battler['prototype'][_0x54bc45(0x4d8)]=function(_0x93e94d){const _0x386882=_0x54bc45;VisuMZ['SkillsStatesCore'][_0x386882(0x429)][_0x386882(0x21e)][_0x386882(0x46c)][_0x386882(0x462)](this,_0x93e94d);},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x234)]=function(_0x4a43ea){const _0x5e2f23=_0x54bc45,_0x556928=VisuMZ[_0x5e2f23(0x24f)],_0x112ca0=['stateHpSlipDamageJS',_0x5e2f23(0x303),_0x5e2f23(0x236),_0x5e2f23(0x225),_0x5e2f23(0x29a),_0x5e2f23(0x2b3)];for(const _0x6e297a of _0x112ca0){_0x556928[_0x6e297a][_0x4a43ea]&&_0x556928[_0x6e297a][_0x4a43ea]['call'](this,_0x4a43ea);}},VisuMZ['SkillsStatesCore'][_0x54bc45(0x494)]=Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x47b)],Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x47b)]=function(){const _0x2c1dfe=_0x54bc45;this[_0x2c1dfe(0x33c)](),VisuMZ['SkillsStatesCore'][_0x2c1dfe(0x494)][_0x2c1dfe(0x462)](this),this['setPassiveStateSlipDamageJS'](),this[_0x2c1dfe(0x437)]();},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x3f9)]=function(){const _0x193d28=_0x54bc45;for(const _0x40c003 of this[_0x193d28(0x4e5)]()){if(!_0x40c003)continue;this['onAddStateMakeCustomSlipValues'](_0x40c003['id']);}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x33c)]=function(){const _0x1ffcba=_0x54bc45;for(const _0x368420 of this[_0x1ffcba(0x274)]()){if(_0x1ffcba(0x282)!==_0x1ffcba(0x523)){if(!_0x368420)continue;_0x368420[_0x1ffcba(0x20d)]['match'](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0x368420['id']);}else{_0x5559f8[_0x1ffcba(0x4ff)][_0x1ffcba(0x406)][_0x1ffcba(0x462)](this);if(this[_0x1ffcba(0x407)])this[_0x1ffcba(0x4db)]();}}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x437)]=function(){const _0x44de0d=_0x54bc45;if(!this[_0x44de0d(0x3e5)]())return;const _0x59258d=this[_0x44de0d(0x274)]();for(const _0x1a8eac of _0x59258d){if(!_0x1a8eac)continue;this['onRegenerateCustomStateDamageOverTime'](_0x1a8eac);}},Game_Battler[_0x54bc45(0x4ff)][_0x54bc45(0x2d4)]=function(_0x16eb2b){const _0x5c8c8c=_0x54bc45,_0x3e2476=this[_0x5c8c8c(0x366)](_0x16eb2b['id'],_0x5c8c8c(0x332))||0x0,_0x6e9d6e=-this[_0x5c8c8c(0x4b8)](),_0x392f22=Math[_0x5c8c8c(0x397)](_0x3e2476,_0x6e9d6e);if(_0x392f22!==0x0){const _0x42e5f1=this[_0x5c8c8c(0x503)]['hpDamage']||0x0;this[_0x5c8c8c(0x2db)](_0x392f22),this['_result']['hpDamage']+=_0x42e5f1;}const _0xbcc721=this['getStateData'](_0x16eb2b['id'],_0x5c8c8c(0x4cc))||0x0;if(_0xbcc721!==0x0){const _0x4a331d=this[_0x5c8c8c(0x503)][_0x5c8c8c(0x2c8)]||0x0;this[_0x5c8c8c(0x41e)](_0xbcc721),this[_0x5c8c8c(0x503)][_0x5c8c8c(0x2c8)]+=_0x4a331d;}const _0x4cb5a7=this[_0x5c8c8c(0x366)](_0x16eb2b['id'],'slipTp')||0x0;_0x4cb5a7!==0x0&&(_0x5c8c8c(0x321)!=='kIPXZ'?this['gainSilentTp'](_0x4cb5a7):(this[_0x5c8c8c(0x32b)](_0x3cbfa6),this[_0x5c8c8c(0x301)](_0x4aaae4),_0x45b686[_0x5c8c8c(0x4ff)]['onRemoveState'][_0x5c8c8c(0x462)](this,_0x34416f)));},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x229)]=Game_Actor['prototype'][_0x54bc45(0x28f)],Game_Actor[_0x54bc45(0x4ff)]['skillTypes']=function(){const _0x337a94=_0x54bc45,_0x30790e=VisuMZ[_0x337a94(0x24f)][_0x337a94(0x229)][_0x337a94(0x462)](this),_0x5b189a=VisuMZ['SkillsStatesCore']['Settings'][_0x337a94(0x2af)];let _0x481e72=_0x5b189a[_0x337a94(0x3fd)];return $gameParty[_0x337a94(0x48e)]()&&(_0x481e72=_0x481e72[_0x337a94(0x42f)](_0x5b189a['BattleHiddenSkillTypes'])),_0x30790e[_0x337a94(0x2a5)](_0x594996=>!_0x481e72['includes'](_0x594996));},Game_Actor['prototype'][_0x54bc45(0x3a7)]=function(){const _0x30360b=_0x54bc45;return this[_0x30360b(0x411)]()[_0x30360b(0x2a5)](_0x33def4=>this[_0x30360b(0x20e)](_0x33def4));},Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x20e)]=function(_0x39f670){const _0x5e43f9=_0x54bc45;if(!this['canUse'](_0x39f670))return![];if(!_0x39f670)return![];if(!this[_0x5e43f9(0x27f)](_0x39f670))return![];if(this[_0x5e43f9(0x473)](_0x39f670))return![];return!![];},Game_Actor[_0x54bc45(0x4ff)]['isSkillTypeMatchForUse']=function(_0x4f9d04){const _0x27fcc0=_0x54bc45,_0x407e9e=this[_0x27fcc0(0x28f)](),_0x513aae=DataManager[_0x27fcc0(0x486)](_0x4f9d04),_0x17f57c=_0x407e9e[_0x27fcc0(0x2a5)](_0x3038aa=>_0x513aae[_0x27fcc0(0x358)](_0x3038aa));return _0x17f57c['length']>0x0;},Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x473)]=function(_0x3a838a){const _0x19990b=_0x54bc45;if(!VisuMZ[_0x19990b(0x24f)]['CheckVisibleBattleNotetags'](this,_0x3a838a))return!![];if(!VisuMZ[_0x19990b(0x24f)][_0x19990b(0x1f4)](this,_0x3a838a))return!![];if(!VisuMZ['SkillsStatesCore'][_0x19990b(0x4d9)](this,_0x3a838a))return!![];return![];},Game_Actor['prototype'][_0x54bc45(0x37f)]=function(){const _0x15ba8d=_0x54bc45;let _0x3bf26f=[this[_0x15ba8d(0x262)](),this[_0x15ba8d(0x477)]()];_0x3bf26f=_0x3bf26f['concat'](this['equips']()[_0x15ba8d(0x2a5)](_0x465892=>_0x465892));for(const _0x28a43a of this['_skills']){const _0x2a1eb7=$dataSkills[_0x28a43a];if(_0x2a1eb7)_0x3bf26f[_0x15ba8d(0x3d2)](_0x2a1eb7);}return _0x3bf26f;},Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x4dd)]=function(){const _0x353b88=_0x54bc45;Game_Battler[_0x353b88(0x4ff)][_0x353b88(0x4dd)][_0x353b88(0x462)](this);const _0x3a4395=VisuMZ[_0x353b88(0x24f)][_0x353b88(0x429)][_0x353b88(0x314)][_0x353b88(0x4e7)];this['_cache'][_0x353b88(0x4e5)]=this[_0x353b88(0x4d6)][_0x353b88(0x4e5)][_0x353b88(0x42f)](_0x3a4395);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x254)]=Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x2d7)],Game_Actor['prototype'][_0x54bc45(0x2d7)]=function(_0x4dbf68){const _0x4aa05d=_0x54bc45;VisuMZ['SkillsStatesCore'][_0x4aa05d(0x254)]['call'](this,_0x4dbf68),this[_0x4aa05d(0x4d6)]={},this[_0x4aa05d(0x4e5)]();},VisuMZ[_0x54bc45(0x24f)]['Game_Actor_forgetSkill']=Game_Actor[_0x54bc45(0x4ff)][_0x54bc45(0x4ba)],Game_Actor[_0x54bc45(0x4ff)]['forgetSkill']=function(_0xd08b0e){const _0x3fa687=_0x54bc45;VisuMZ[_0x3fa687(0x24f)][_0x3fa687(0x44c)][_0x3fa687(0x462)](this,_0xd08b0e),this[_0x3fa687(0x4d6)]={},this[_0x3fa687(0x4e5)]();},Game_Actor[_0x54bc45(0x4ff)]['stepsForTurn']=function(){const _0x417ffc=_0x54bc45;return VisuMZ['SkillsStatesCore'][_0x417ffc(0x429)]['States']['TurnEndOnMap']??0x14;},Game_Enemy[_0x54bc45(0x4ff)][_0x54bc45(0x37f)]=function(){const _0x423b2b=_0x54bc45;let _0x46b4fd=[this[_0x423b2b(0x228)]()];return _0x46b4fd[_0x423b2b(0x42f)](this[_0x423b2b(0x411)]());},Game_Enemy['prototype'][_0x54bc45(0x4dd)]=function(){const _0x47066f=_0x54bc45;Game_Battler['prototype'][_0x47066f(0x4dd)][_0x47066f(0x462)](this);const _0x421f86=VisuMZ[_0x47066f(0x24f)]['Settings'][_0x47066f(0x314)][_0x47066f(0x41f)];this[_0x47066f(0x4d6)]['passiveStates']=this[_0x47066f(0x4d6)]['passiveStates'][_0x47066f(0x42f)](_0x421f86);},Game_Enemy[_0x54bc45(0x4ff)][_0x54bc45(0x411)]=function(){const _0x29f871=_0x54bc45,_0x43275e=[];for(const _0x5c4b23 of this['enemy']()[_0x29f871(0x307)]){const _0x2ae58c=$dataSkills[_0x5c4b23[_0x29f871(0x3f1)]];if(_0x2ae58c&&!_0x43275e['includes'](_0x2ae58c))_0x43275e[_0x29f871(0x3d2)](_0x2ae58c);}return _0x43275e;},Game_Enemy[_0x54bc45(0x4ff)][_0x54bc45(0x46f)]=function(_0x727fb7){const _0x4f26a8=_0x54bc45;return this[_0x4f26a8(0x29f)]($dataStates[_0x727fb7]);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x363)]=Game_Unit['prototype'][_0x54bc45(0x1fb)],Game_Unit[_0x54bc45(0x4ff)]['isAllDead']=function(){const _0x4a3341=_0x54bc45;if(this[_0x4a3341(0x3a5)]())return!![];return VisuMZ[_0x4a3341(0x24f)]['Game_Unit_isAllDead'][_0x4a3341(0x462)](this);},Game_Unit[_0x54bc45(0x4ff)][_0x54bc45(0x3a5)]=function(){const _0x51fea1=_0x54bc45,_0x112073=this['aliveMembers']();for(const _0x90d109 of _0x112073){if(!_0x90d109[_0x51fea1(0x4e6)]())return![];}return!![];},VisuMZ[_0x54bc45(0x24f)]['Game_Troop_setup']=Game_Troop[_0x54bc45(0x4ff)][_0x54bc45(0x224)],Game_Troop[_0x54bc45(0x4ff)][_0x54bc45(0x224)]=function(_0x461ce5){const _0x5ce56f=_0x54bc45;VisuMZ[_0x5ce56f(0x24f)]['Game_Troop_setup'][_0x5ce56f(0x462)](this,_0x461ce5),this[_0x5ce56f(0x38c)]();},Game_Troop[_0x54bc45(0x4ff)]['makeCurrentTroopUniqueID']=function(){const _0xdc70c7=_0x54bc45;this[_0xdc70c7(0x317)]=Graphics['frameCount'];},Game_Troop[_0x54bc45(0x4ff)][_0x54bc45(0x534)]=function(){const _0x24cf4e=_0x54bc45;return this[_0x24cf4e(0x317)]=this[_0x24cf4e(0x317)]||Graphics[_0x24cf4e(0x27e)],this['_currentTroopUniqueID'];},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x50d)]=function(){const _0x7467ac=_0x54bc45;if(ConfigManager[_0x7467ac(0x509)]&&ConfigManager[_0x7467ac(0x34b)]!==undefined)return _0x7467ac(0x36c)===_0x7467ac(0x36c)?ConfigManager[_0x7467ac(0x34b)]:this[_0x7467ac(0x2c2)](_0x2069cb)>0x0;else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_ItemBase[_0x7467ac(0x4ff)]['isRightInputMode'][_0x7467ac(0x462)](this);}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3a3)]=function(){const _0x4de5b3=_0x54bc45;if(ConfigManager[_0x4de5b3(0x509)]&&ConfigManager[_0x4de5b3(0x271)]!==undefined)return ConfigManager[_0x4de5b3(0x271)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x4de5b3(0x4c6)!=='IgNyt'){if(!_0xf53986[_0x4de5b3(0x24f)]['Settings'][_0x4de5b3(0x24e)]['ShowTurns'])return;if(!_0x45b8f1['isStateAffected'](_0x22bb68['id']))return;if(_0x3182be[_0x4de5b3(0x368)]===0x0)return;if(_0x7a3d2b[_0x4de5b3(0x20d)]['match'](/<HIDE STATE TURNS>/i))return;const _0x31613f=_0x206d5d['stateTurns'](_0x3906e9['id']),_0x4c5c56=_0x34a237[_0x4de5b3(0x2b8)],_0x1f6d48=_0x3ee557[_0x4de5b3(0x3c8)](_0x308a93);this[_0x4de5b3(0x383)](_0x1f6d48),this['changeOutlineColor'](_0x4de5b3(0x356)),this[_0x4de5b3(0x1e8)][_0x4de5b3(0x4d4)]=!![],this[_0x4de5b3(0x1e8)][_0x4de5b3(0x4f1)]=_0x45ecac[_0x4de5b3(0x24f)]['Settings'][_0x4de5b3(0x24e)]['TurnFontSize'],_0x249f67+=_0x5b06dc[_0x4de5b3(0x24f)][_0x4de5b3(0x429)]['States'][_0x4de5b3(0x2fa)],_0x66e209+=_0x3e7699[_0x4de5b3(0x24f)]['Settings'][_0x4de5b3(0x24e)][_0x4de5b3(0x256)],this[_0x4de5b3(0x425)](_0x31613f,_0x2ced7e,_0x9108b0,_0x4c5c56,_0x4de5b3(0x30e)),this[_0x4de5b3(0x1e8)][_0x4de5b3(0x4d4)]=![],this[_0x4de5b3(0x42c)]();}else return this['updatedLayoutStyle']()[_0x4de5b3(0x389)](/RIGHT/i);}else return'dpHdY'!==_0x4de5b3(0x372)?this[_0x4de5b3(0x411)]()['filter'](_0x9db3c6=>this['isSkillUsableForAutoBattle'](_0x9db3c6)):Scene_ItemBase[_0x4de5b3(0x4ff)][_0x4de5b3(0x3a3)]['call'](this);}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x2a6)]=function(){const _0x3ca935=_0x54bc45;return VisuMZ[_0x3ca935(0x24f)][_0x3ca935(0x429)]['Skills']['LayoutStyle'];},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3f3)]=function(){const _0x32dff=_0x54bc45;return this['_categoryWindow']&&this[_0x32dff(0x235)]['isUseModernControls']();},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x2b2)]=function(){const _0x36571b=_0x54bc45;return VisuMZ[_0x36571b(0x24f)]['Settings']['Skills'][_0x36571b(0x3e1)];},VisuMZ[_0x54bc45(0x24f)]['Scene_Skill_helpWindowRect']=Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x415)],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x35a54a=_0x54bc45;if(this[_0x35a54a(0x2b2)]())return this[_0x35a54a(0x4c0)]();else{if(_0x35a54a(0x23a)!==_0x35a54a(0x3f7))return VisuMZ[_0x35a54a(0x24f)][_0x35a54a(0x417)]['call'](this);else _0x5b8384[_0x35a54a(0x3f8)](_0xe88ae7,_0x1a1955),this[_0x35a54a(0x4a9)](_0x25c9f8);}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x4c0)]=function(){const _0x46f04b=_0x54bc45,_0x5b87ec=0x0,_0x397c9d=this[_0x46f04b(0x419)](),_0x4a9ddc=Graphics[_0x46f04b(0x202)],_0x1566b6=this[_0x46f04b(0x49c)]();return new Rectangle(_0x5b87ec,_0x397c9d,_0x4a9ddc,_0x1566b6);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x37e)]=Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3a1)],Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3a1)]=function(){const _0x4afe36=_0x54bc45;if(this[_0x4afe36(0x2b2)]())return _0x4afe36(0x3a4)===_0x4afe36(0x204)?_0x587376[_0x4afe36(0x269)]():this[_0x4afe36(0x3d9)]();else{if(_0x4afe36(0x440)!==_0x4afe36(0x440)){const _0x9d0889=_0x5205fa[_0x4afe36(0x24f)],_0x5d96f8=[_0x4afe36(0x4e4),'stateHpSlipHealJS',_0x4afe36(0x236),_0x4afe36(0x225),_0x4afe36(0x29a),'stateTpSlipHealJS'];for(const _0x244ec9 of _0x5d96f8){_0x9d0889[_0x244ec9][_0xbe7820]&&_0x9d0889[_0x244ec9][_0x2e2e87][_0x4afe36(0x462)](this,_0x58a089);}}else return VisuMZ[_0x4afe36(0x24f)][_0x4afe36(0x37e)][_0x4afe36(0x462)](this);}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x288)]=function(){const _0x173c31=_0x54bc45;return VisuMZ['SkillsStatesCore'][_0x173c31(0x429)][_0x173c31(0x2af)][_0x173c31(0x460)]??Scene_MenuBase['prototype'][_0x173c31(0x288)][_0x173c31(0x462)](this);},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3d9)]=function(){const _0x6011c8=_0x54bc45,_0x1e4679=this['mainCommandWidth'](),_0x760415=this[_0x6011c8(0x511)](0x3,!![]),_0x4ba333=this['isRightInputMode']()?Graphics[_0x6011c8(0x202)]-_0x1e4679:0x0,_0x5f4293=this[_0x6011c8(0x3cb)]();return new Rectangle(_0x4ba333,_0x5f4293,_0x1e4679,_0x760415);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x295)]=Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x4b2)],Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x4b2)]=function(){const _0x200551=_0x54bc45;if(this[_0x200551(0x2b2)]())return this[_0x200551(0x21c)]();else{if(_0x200551(0x43d)===_0x200551(0x3cf))_0x502a82+=this[_0x200551(0x4b1)](_0x4570fe),this[_0x200551(0x2c1)](_0x4f9448,_0x33d885);else return VisuMZ['SkillsStatesCore'][_0x200551(0x295)][_0x200551(0x462)](this);}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x21c)]=function(){const _0x400492=_0x54bc45,_0xc2aebb=Graphics[_0x400492(0x202)]-this['mainCommandWidth'](),_0x42a403=this[_0x400492(0x312)][_0x400492(0x2fb)],_0x2708b0=this[_0x400492(0x3a3)]()?0x0:Graphics['boxWidth']-_0xc2aebb,_0xb94a98=this[_0x400492(0x3cb)]();return new Rectangle(_0x2708b0,_0xb94a98,_0xc2aebb,_0x42a403);},VisuMZ['SkillsStatesCore'][_0x54bc45(0x455)]=Scene_Skill[_0x54bc45(0x4ff)]['createItemWindow'],Scene_Skill[_0x54bc45(0x4ff)]['createItemWindow']=function(){const _0x520d0d=_0x54bc45;VisuMZ['SkillsStatesCore'][_0x520d0d(0x455)][_0x520d0d(0x462)](this),this[_0x520d0d(0x219)]()&&this[_0x520d0d(0x526)]();},VisuMZ['SkillsStatesCore'][_0x54bc45(0x3a2)]=Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x33b)],Scene_Skill[_0x54bc45(0x4ff)]['itemWindowRect']=function(){const _0x287962=_0x54bc45;if(this[_0x287962(0x2b2)]())return this['itemWindowRectSkillsStatesCore']();else{const _0x255125=VisuMZ[_0x287962(0x24f)][_0x287962(0x3a2)]['call'](this);if(this['allowCreateShopStatusWindow']()&&this[_0x287962(0x3fa)]()){if(_0x287962(0x25c)!==_0x287962(0x25c)){_0x53f2e3['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x1d5ed5=_0x20667b[_0x287962(0x336)](_0x38a390(_0x44cab2['$1'])['toUpperCase']()),_0x4fcd79=_0x10529c(_0x4b2e40['$2']);_0x1d5ed5>=0x0&&(_0x29f3bc[_0x287962(0x2c1)](_0x1d5ed5,_0x4fcd79),this['makeSuccess'](_0x41aa69));}else _0x255125['width']-=this[_0x287962(0x259)]();}return _0x255125;}},Scene_Skill[_0x54bc45(0x4ff)]['itemWindowRectSkillsStatesCore']=function(){const _0x5c8f10=_0x54bc45,_0x12260d=Graphics['boxWidth']-this['shopStatusWidth'](),_0x51a1a8=this[_0x5c8f10(0x22d)]()-this[_0x5c8f10(0x1ee)][_0x5c8f10(0x2fb)],_0x1c9a75=this[_0x5c8f10(0x3a3)]()?Graphics[_0x5c8f10(0x202)]-_0x12260d:0x0,_0x2c59aa=this[_0x5c8f10(0x1ee)]['y']+this['_statusWindow'][_0x5c8f10(0x2fb)];return new Rectangle(_0x1c9a75,_0x2c59aa,_0x12260d,_0x51a1a8);},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x219)]=function(){const _0x58f764=_0x54bc45;if(!Imported[_0x58f764(0x1e5)])return![];else{if(this[_0x58f764(0x2b2)]()){if(_0x58f764(0x2e1)===_0x58f764(0x46a))this[_0x58f764(0x4d6)]={},_0x3c540b['SkillsStatesCore']['Game_BattlerBase_refresh'][_0x58f764(0x462)](this);else return!![];}else return VisuMZ[_0x58f764(0x24f)]['Settings']['Skills'][_0x58f764(0x3d0)];}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x3fa)]=function(){const _0x4ad4f0=_0x54bc45;return VisuMZ[_0x4ad4f0(0x24f)][_0x4ad4f0(0x429)]['Skills'][_0x4ad4f0(0x495)];},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x526)]=function(){const _0x2137ff=_0x54bc45,_0x52443f=this[_0x2137ff(0x42b)]();this[_0x2137ff(0x3a6)]=new Window_ShopStatus(_0x52443f),this[_0x2137ff(0x2fe)](this[_0x2137ff(0x3a6)]),this['_itemWindow'][_0x2137ff(0x42e)](this[_0x2137ff(0x3a6)]);const _0x4c81db=VisuMZ[_0x2137ff(0x24f)][_0x2137ff(0x429)][_0x2137ff(0x2af)][_0x2137ff(0x281)];this[_0x2137ff(0x3a6)][_0x2137ff(0x44a)](_0x4c81db||0x0);},Scene_Skill[_0x54bc45(0x4ff)]['shopStatusWindowRect']=function(){const _0x1dd6ce=_0x54bc45;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x1dd6ce(0x507)===_0x1dd6ce(0x30d)){const _0x2423b6=_0x2f14b8[_0x329eb7-_0x5f495b['length']];if(_0x2423b6===_0x2938dd)return;_0x9a8452['prototype'][_0x1dd6ce(0x35e)]['call'](this,_0x197696,_0x2423b6,0x0,0x0),_0x3b0b6e[_0x1dd6ce(0x4ff)][_0x1dd6ce(0x457)][_0x1dd6ce(0x462)](this,_0x30c4fd,_0x2423b6,0x0,0x0);}else return this['shopStatusWindowRectSkillsStatesCore']();}else return VisuMZ[_0x1dd6ce(0x24f)]['Settings'][_0x1dd6ce(0x2af)][_0x1dd6ce(0x29b)][_0x1dd6ce(0x462)](this);},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x530)]=function(){const _0x5f3e71=_0x54bc45,_0x1c7856=this['shopStatusWidth'](),_0x4015f5=this[_0x5f3e71(0x41b)]['height'],_0x39f89f=this['isRightInputMode']()?0x0:Graphics[_0x5f3e71(0x202)]-this['shopStatusWidth'](),_0x16b0c9=this['_itemWindow']['y'];return new Rectangle(_0x39f89f,_0x16b0c9,_0x1c7856,_0x4015f5);},Scene_Skill[_0x54bc45(0x4ff)]['shopStatusWidth']=function(){const _0x56eccd=_0x54bc45;if(Imported['VisuMZ_1_ItemsEquipsCore']){if('rbcxv'!==_0x56eccd(0x247))return Scene_Shop[_0x56eccd(0x4ff)]['statusWidth']();else _0x3ee1d0=_0x508d90(_0x75c289);}else{if(_0x56eccd(0x37d)===_0x56eccd(0x37d))return 0x0;else{this[_0x56eccd(0x42c)](),this[_0x56eccd(0x1e8)][_0x56eccd(0x2b5)]();const _0x2ad7f7=this['_battler'];if(!_0x2ad7f7)return;const _0x335ef6=_0x2ad7f7[_0x56eccd(0x274)]()[_0x56eccd(0x2a5)](_0x13441d=>_0x13441d[_0x56eccd(0x3cd)]>0x0),_0x22bf50=[..._0x3c28ad(0x8)[_0x56eccd(0x294)]()]['filter'](_0x43cc87=>_0x2ad7f7[_0x56eccd(0x4f9)](_0x43cc87)!==0x0),_0x5a3b75=this[_0x56eccd(0x31b)],_0x34a62f=_0x335ef6[_0x5a3b75];if(_0x34a62f)_0x584791['prototype'][_0x56eccd(0x3fc)][_0x56eccd(0x462)](this,_0x2ad7f7,_0x34a62f,0x0,0x0),_0x5cb480['prototype']['drawActorStateData'][_0x56eccd(0x462)](this,_0x2ad7f7,_0x34a62f,0x0,0x0);else{const _0xb99fc2=_0x22bf50[_0x5a3b75-_0x335ef6[_0x56eccd(0x413)]];if(_0xb99fc2===_0x313d1b)return;_0x10d39c[_0x56eccd(0x4ff)][_0x56eccd(0x35e)][_0x56eccd(0x462)](this,_0x2ad7f7,_0xb99fc2,0x0,0x0),_0x29b66c[_0x56eccd(0x4ff)][_0x56eccd(0x457)]['call'](this,_0x2ad7f7,_0xb99fc2,0x0,0x0);}}}},Scene_Skill[_0x54bc45(0x4ff)][_0x54bc45(0x309)]=function(){const _0x579a82=_0x54bc45;return this[_0x579a82(0x312)]&&this[_0x579a82(0x312)][_0x579a82(0x496)]?TextManager[_0x579a82(0x4a8)]:'';},VisuMZ['SkillsStatesCore'][_0x54bc45(0x519)]=Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x327)],Sprite_Gauge['prototype'][_0x54bc45(0x327)]=function(){const _0x55a53a=_0x54bc45;VisuMZ[_0x55a53a(0x24f)][_0x55a53a(0x519)][_0x55a53a(0x462)](this),this[_0x55a53a(0x2b9)]=null;},VisuMZ['SkillsStatesCore'][_0x54bc45(0x27c)]=Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x224)],Sprite_Gauge['prototype'][_0x54bc45(0x224)]=function(_0x310190,_0x10cbc6){const _0x372c4b=_0x54bc45;this[_0x372c4b(0x209)](_0x310190,_0x10cbc6),_0x10cbc6=_0x10cbc6['toLowerCase'](),VisuMZ['SkillsStatesCore']['Sprite_Gauge_setup'][_0x372c4b(0x462)](this,_0x310190,_0x10cbc6);},Sprite_Gauge[_0x54bc45(0x4ff)]['setupSkillsStatesCore']=function(_0x2b5e34,_0x4af2c6){const _0x16d787=_0x54bc45,_0x5b98ad=VisuMZ[_0x16d787(0x24f)][_0x16d787(0x429)][_0x16d787(0x200)][_0x16d787(0x2a5)](_0x108297=>_0x108297['Name'][_0x16d787(0x41d)]()===_0x4af2c6[_0x16d787(0x41d)]());_0x5b98ad[_0x16d787(0x413)]>=0x1?this['_costSettings']=_0x5b98ad[0x0]:this['_costSettings']=null;},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x40e)]=Sprite_Gauge['prototype'][_0x54bc45(0x387)],Sprite_Gauge['prototype'][_0x54bc45(0x387)]=function(){const _0x56a201=_0x54bc45;if(this[_0x56a201(0x369)]&&this['_costSettings']){if(_0x56a201(0x35c)!=='bpsRC')return this[_0x56a201(0x384)]();else _0x4d9954[_0x56a201(0x518)]['push']('POSITIVE');}else return VisuMZ['SkillsStatesCore'][_0x56a201(0x40e)][_0x56a201(0x462)](this);},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x384)]=function(){const _0x3687fe=_0x54bc45;return this[_0x3687fe(0x2b9)][_0x3687fe(0x20c)][_0x3687fe(0x462)](this[_0x3687fe(0x369)]);},VisuMZ[_0x54bc45(0x24f)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x1df)],Sprite_Gauge[_0x54bc45(0x4ff)]['currentMaxValue']=function(){const _0x54ea88=_0x54bc45;if(this[_0x54ea88(0x369)]&&this[_0x54ea88(0x2b9)])return this[_0x54ea88(0x430)]();else{if('TeOMG'!==_0x54ea88(0x431))return VisuMZ['SkillsStatesCore'][_0x54ea88(0x2f1)][_0x54ea88(0x462)](this);else{let _0x2e4220=_0x21c05f[_0x54ea88(0x28f)][_0x147d6d];if(_0x2e4220[_0x54ea88(0x389)](/\\I\[(\d+)\]/i))return _0x2e4220;if(this[_0x54ea88(0x4b9)]()===_0x54ea88(0x4fb))return _0x2e4220;const _0x58e10f=_0x58a7b1[_0x54ea88(0x24f)][_0x54ea88(0x429)][_0x54ea88(0x2af)],_0x5bd312=_0x10aad8[_0x54ea88(0x34e)][_0x54ea88(0x358)](_0x9e683),_0x19c3d7=_0x5bd312?_0x58e10f[_0x54ea88(0x328)]:_0x58e10f['IconStypeNorm'];return _0x54ea88(0x340)[_0x54ea88(0x47a)](_0x19c3d7,_0x2e4220);}}},Sprite_Gauge['prototype'][_0x54bc45(0x430)]=function(){const _0x543f37=_0x54bc45;return this['_costSettings'][_0x543f37(0x253)][_0x543f37(0x462)](this[_0x543f37(0x369)]);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x446)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge['prototype'][_0x54bc45(0x47c)]=function(){const _0x15aa76=_0x54bc45,_0x3b2b92=VisuMZ[_0x15aa76(0x24f)]['Sprite_Gauge_gaugeRate']['call'](this);return _0x3b2b92['clamp'](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x54bc45(0x24b)]=Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x1ff)],Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x1ff)]=function(){const _0x20c22f=_0x54bc45;this[_0x20c22f(0x369)]&&this[_0x20c22f(0x2b9)]?(this[_0x20c22f(0x474)][_0x20c22f(0x2b5)](),this[_0x20c22f(0x2d8)]()):VisuMZ[_0x20c22f(0x24f)][_0x20c22f(0x24b)][_0x20c22f(0x462)](this);},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x3d7)]=function(){const _0x3f497d=_0x54bc45;let _0x45a3e4=this['currentValue']();return Imported['VisuMZ_0_CoreEngine']&&this[_0x3f497d(0x3ec)]()&&(_0x45a3e4=VisuMZ['GroupDigits'](_0x45a3e4)),_0x45a3e4;},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x2d8)]=function(){const _0x1644a6=_0x54bc45;this[_0x1644a6(0x474)][_0x1644a6(0x2b5)](),this[_0x1644a6(0x2b9)]['GaugeDrawJS']['call'](this);},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x444)]=function(_0x331d7f,_0x4ff804,_0x40dc42,_0xdf4c98,_0x23203c,_0x5a9a73){const _0x122dcf=_0x54bc45,_0xa5e422=this[_0x122dcf(0x47c)](),_0x498122=Math[_0x122dcf(0x1fc)]((_0x23203c-0x2)*_0xa5e422),_0x1596b9=_0x5a9a73-0x2,_0xfe7ddd=this[_0x122dcf(0x296)]();this[_0x122dcf(0x474)][_0x122dcf(0x3c5)](_0x40dc42,_0xdf4c98,_0x23203c,_0x5a9a73,_0xfe7ddd),this['bitmap'][_0x122dcf(0x26f)](_0x40dc42+0x1,_0xdf4c98+0x1,_0x498122,_0x1596b9,_0x331d7f,_0x4ff804);},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x45c)]=function(){const _0x4d5fab=_0x54bc45,_0x3565b1=VisuMZ[_0x4d5fab(0x24f)]['Settings'][_0x4d5fab(0x4c8)];return _0x3565b1[_0x4d5fab(0x34f)]===_0x4d5fab(0x2cd)?$gameSystem[_0x4d5fab(0x269)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x2da)]=function(){const _0x348b67=_0x54bc45,_0x50836a=VisuMZ['SkillsStatesCore']['Settings'][_0x348b67(0x4c8)];return _0x50836a[_0x348b67(0x34f)]==='number'?$gameSystem['mainFontSize']()-0x6:_0x348b67(0x451)===_0x348b67(0x451)?$gameSystem['mainFontSize']()-0x2:![];},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x266)]=function(){const _0x2dd751=_0x54bc45,_0x44a4c7=VisuMZ['SkillsStatesCore'][_0x2dd751(0x429)][_0x2dd751(0x4c8)];if(_0x44a4c7[_0x2dd751(0x23e)]===_0x2dd751(0x2cd)){if(_0x2dd751(0x51b)===_0x2dd751(0x277))for(const _0x52db83 of _0x4a5f32){_0x52db83[_0x2dd751(0x389)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x39d871=_0xb462a8(_0x17b9c3['$1']);_0x5cb2f7[_0x2dd751(0x2b0)](_0x39d871);}else return $gameSystem[_0x2dd751(0x269)]();}else return $gameSystem['mainFontFace']();},Sprite_Gauge['prototype'][_0x54bc45(0x2a3)]=function(){const _0x5217c9=_0x54bc45,_0x53f21f=VisuMZ[_0x5217c9(0x24f)][_0x5217c9(0x429)][_0x5217c9(0x4c8)];if(_0x53f21f['ValueFontMainType']==='number')return $gameSystem[_0x5217c9(0x28d)]()-0x6;else{if(_0x5217c9(0x3ce)===_0x5217c9(0x380))this['_statusWindow']=_0x5bd015,this[_0x5217c9(0x406)]();else return $gameSystem[_0x5217c9(0x28d)]()-0x2;}},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x1fd)]=function(){const _0x315a96=_0x54bc45,_0x49877f=VisuMZ[_0x315a96(0x24f)][_0x315a96(0x429)][_0x315a96(0x4c8)];if(_0x49877f[_0x315a96(0x3ac)]){if(_0x49877f[_0x315a96(0x26a)]===0x1){if(_0x315a96(0x3e0)!=='PuYrD'){const _0x3265d8=_0x167d29[_0x315a96(0x346)]('['+_0x2d0350['$1']['match'](/\d+/g)+']');for(const _0x40d5a3 of _0x3265d8){if(!_0x223386[_0x315a96(0x448)](_0x40d5a3))return![];}return!![];}else return this[_0x315a96(0x313)]();}else{if(_0x49877f[_0x315a96(0x26a)]===0x2)return this[_0x315a96(0x374)]();}}const _0x55fb7a=_0x49877f[_0x315a96(0x338)];return ColorManager[_0x315a96(0x395)](_0x55fb7a);},Sprite_Gauge['prototype'][_0x54bc45(0x43c)]=function(){const _0xedb795=_0x54bc45,_0x49fc34=VisuMZ[_0xedb795(0x24f)][_0xedb795(0x429)][_0xedb795(0x4c8)];if(this[_0xedb795(0x233)]()<=0x0){if(_0xedb795(0x273)===_0xedb795(0x280)){const _0x58153e=_0x290fba['SkillsStatesCore'][_0xedb795(0x429)][_0xedb795(0x21e)]['MaxTurns'];this[_0xedb795(0x322)][_0x4c80a6]=_0x117656['clamp'](0x0,_0x58153e);}else return _0xedb795(0x471);}else{if(_0x49fc34[_0xedb795(0x393)])return _0xedb795(0x356);else{if('sPXEb'===_0xedb795(0x22c))return ColorManager[_0xedb795(0x26d)]();else{if(!_0x315fa5[_0xedb795(0x24f)][_0xedb795(0x2e7)](this,_0x46287))return!![];if(!_0x53a6bb[_0xedb795(0x24f)]['CheckVisibleSwitchNotetags'](this,_0x36e67e))return!![];if(!_0x4ca6b6[_0xedb795(0x24f)][_0xedb795(0x4d9)](this,_0x3ecb73))return!![];return![];}}}},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x233)]=function(){const _0x2398e1=_0x54bc45;return VisuMZ['SkillsStatesCore'][_0x2398e1(0x429)]['Gauge'][_0x2398e1(0x4f2)]||0x0;},Sprite_Gauge[_0x54bc45(0x4ff)][_0x54bc45(0x4be)]=function(){const _0x3a722a=_0x54bc45,_0x360982=VisuMZ[_0x3a722a(0x24f)][_0x3a722a(0x429)][_0x3a722a(0x4c8)];if(this['valueOutlineWidth']()<=0x0)return _0x3a722a(0x471);else{if(_0x360982[_0x3a722a(0x4a3)]){if(_0x3a722a(0x4c3)!==_0x3a722a(0x2d6))return _0x3a722a(0x356);else{const _0x495668=_0x411770(_0x5f33b0['$1']),_0x25664c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x3a722a(0x47a)](_0x495668);_0xc4d5ba[_0x3a722a(0x24f)][_0x3a722a(0x3b5)][_0x3580b1['id']]=new _0x1d963a(_0x3a722a(0x25a),_0x25664c);}}else return ColorManager[_0x3a722a(0x26d)]();}},Sprite_Gauge['prototype'][_0x54bc45(0x498)]=function(){const _0x49ef70=_0x54bc45;return VisuMZ[_0x49ef70(0x24f)][_0x49ef70(0x429)][_0x49ef70(0x4c8)][_0x49ef70(0x2dc)]||0x0;},VisuMZ[_0x54bc45(0x24f)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x54bc45(0x4ff)]['loadBitmap'],Sprite_StateIcon['prototype'][_0x54bc45(0x1e7)]=function(){const _0x4a47a5=_0x54bc45;VisuMZ[_0x4a47a5(0x24f)]['Sprite_StateIcon_loadBitmap'][_0x4a47a5(0x462)](this),this['createTurnDisplaySprite']();},Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x4ce)]=function(){const _0x4d5636=_0x54bc45,_0x45280f=Window_Base[_0x4d5636(0x4ff)][_0x4d5636(0x208)]();this['_turnDisplaySprite']=new Sprite(),this[_0x4d5636(0x311)][_0x4d5636(0x474)]=new Bitmap(ImageManager[_0x4d5636(0x2b8)],_0x45280f),this['_turnDisplaySprite']['anchor']['x']=this[_0x4d5636(0x433)]['x'],this[_0x4d5636(0x311)][_0x4d5636(0x433)]['y']=this[_0x4d5636(0x433)]['y'],this['addChild'](this['_turnDisplaySprite']),this['contents']=this[_0x4d5636(0x311)][_0x4d5636(0x474)];},VisuMZ[_0x54bc45(0x24f)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x1f2)],Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x1f2)]=function(){const _0x635d74=_0x54bc45;VisuMZ[_0x635d74(0x24f)][_0x635d74(0x43f)][_0x635d74(0x462)](this),this[_0x635d74(0x436)]();},Sprite_StateIcon['prototype'][_0x54bc45(0x425)]=function(_0x23907d,_0x3b58d0,_0xf19f56,_0x369508,_0x112ef5){const _0x4afca0=_0x54bc45;this[_0x4afca0(0x1e8)]['drawText'](_0x23907d,_0x3b58d0,_0xf19f56,_0x369508,this[_0x4afca0(0x1e8)][_0x4afca0(0x2fb)],_0x112ef5);},Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x436)]=function(){const _0x5ae351=_0x54bc45;this['resetFontSettings'](),this['contents'][_0x5ae351(0x2b5)]();const _0x5e0a76=this['_battler'];if(!_0x5e0a76)return;const _0x4e03e5=_0x5e0a76[_0x5ae351(0x274)]()[_0x5ae351(0x2a5)](_0x7814d6=>_0x7814d6[_0x5ae351(0x3cd)]>0x0),_0x58b674=[...Array(0x8)[_0x5ae351(0x294)]()][_0x5ae351(0x2a5)](_0x332d52=>_0x5e0a76['buff'](_0x332d52)!==0x0),_0x1d96e9=this[_0x5ae351(0x31b)],_0x248799=_0x4e03e5[_0x1d96e9];if(_0x248799)Window_Base['prototype'][_0x5ae351(0x3fc)][_0x5ae351(0x462)](this,_0x5e0a76,_0x248799,0x0,0x0),Window_Base['prototype']['drawActorStateData'][_0x5ae351(0x462)](this,_0x5e0a76,_0x248799,0x0,0x0);else{const _0x38ed45=_0x58b674[_0x1d96e9-_0x4e03e5[_0x5ae351(0x413)]];if(_0x38ed45===undefined)return;Window_Base[_0x5ae351(0x4ff)]['drawActorBuffTurns'][_0x5ae351(0x462)](this,_0x5e0a76,_0x38ed45,0x0,0x0),Window_Base['prototype'][_0x5ae351(0x457)][_0x5ae351(0x462)](this,_0x5e0a76,_0x38ed45,0x0,0x0);}},Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x42c)]=function(){const _0x145dd6=_0x54bc45;this[_0x145dd6(0x1e8)][_0x145dd6(0x257)]=$gameSystem['mainFontFace'](),this['contents'][_0x145dd6(0x4f1)]=$gameSystem[_0x145dd6(0x28d)](),this[_0x145dd6(0x450)]();},Sprite_StateIcon['prototype'][_0x54bc45(0x450)]=function(){const _0x2eed5e=_0x54bc45;this['changeTextColor'](ColorManager[_0x2eed5e(0x339)]()),this[_0x2eed5e(0x4e8)](ColorManager[_0x2eed5e(0x26d)]());},Sprite_StateIcon[_0x54bc45(0x4ff)][_0x54bc45(0x383)]=function(_0x769d9){const _0x416ff2=_0x54bc45;this['contents'][_0x416ff2(0x3a8)]=_0x769d9;},Sprite_StateIcon['prototype'][_0x54bc45(0x4e8)]=function(_0x3a4922){const _0x17ce04=_0x54bc45;this[_0x17ce04(0x1e8)][_0x17ce04(0x26d)]=_0x3a4922;},Sprite_StateIcon[_0x54bc45(0x4ff)]['hide']=function(){const _0x405409=_0x54bc45;this[_0x405409(0x4a0)]=!![],this[_0x405409(0x505)]();},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x4b3)]=function(_0x225d73,_0x14af28,_0x1403b1,_0x1f95dc,_0x51c519){const _0x395cf7=_0x54bc45,_0x5b6a78=this['createAllSkillCostText'](_0x225d73,_0x14af28),_0x3fee4f=this[_0x395cf7(0x1e4)](_0x5b6a78,_0x1403b1,_0x1f95dc,_0x51c519),_0x22737a=_0x1403b1+_0x51c519-_0x3fee4f[_0x395cf7(0x2ff)];this['drawTextEx'](_0x5b6a78,_0x22737a,_0x1f95dc,_0x51c519),this[_0x395cf7(0x42c)]();},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x385)]=function(_0x69dc39,_0x4edd27){const _0x3ac0dd=_0x54bc45;let _0x5ab1ad='';for(settings of VisuMZ['SkillsStatesCore'][_0x3ac0dd(0x429)][_0x3ac0dd(0x200)]){if(!this['isSkillCostShown'](_0x69dc39,_0x4edd27,settings))continue;if(_0x5ab1ad[_0x3ac0dd(0x413)]>0x0)_0x5ab1ad+=this[_0x3ac0dd(0x47f)]();_0x5ab1ad+=this[_0x3ac0dd(0x3b2)](_0x69dc39,_0x4edd27,settings);}_0x5ab1ad=this[_0x3ac0dd(0x39e)](_0x69dc39,_0x4edd27,_0x5ab1ad);if(_0x4edd27[_0x3ac0dd(0x20d)][_0x3ac0dd(0x389)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x5ab1ad[_0x3ac0dd(0x413)]>0x0)_0x5ab1ad+=this[_0x3ac0dd(0x47f)]();_0x5ab1ad+=String(RegExp['$1']);}return _0x5ab1ad;},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x39e)]=function(_0x2c1210,_0x5922c9,_0x8542b0){return _0x8542b0;},Window_Base['prototype'][_0x54bc45(0x25d)]=function(_0x2e45f4,_0x2c6041,_0x58bf38){const _0x35b2a5=_0x54bc45;let _0x5c2d79=_0x58bf38[_0x35b2a5(0x4f6)][_0x35b2a5(0x462)](_0x2e45f4,_0x2c6041);return _0x5c2d79=_0x2e45f4['adjustSkillCost'](_0x2c6041,_0x5c2d79,_0x58bf38),_0x58bf38['ShowJS'][_0x35b2a5(0x462)](_0x2e45f4,_0x2c6041,_0x5c2d79,_0x58bf38);},Window_Base['prototype']['createSkillCostText']=function(_0x1cb0c7,_0x138250,_0x5ee5da){const _0x295868=_0x54bc45;let _0x1ab758=_0x5ee5da[_0x295868(0x4f6)]['call'](_0x1cb0c7,_0x138250);return _0x1ab758=_0x1cb0c7[_0x295868(0x47e)](_0x138250,_0x1ab758,_0x5ee5da),_0x5ee5da['TextJS']['call'](_0x1cb0c7,_0x138250,_0x1ab758,_0x5ee5da);},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x47f)]=function(){return'\x20';},Window_Base[_0x54bc45(0x4ff)]['drawActorIcons']=function(_0x25ccba,_0x4f5961,_0x2d2bc3,_0x75e140){const _0x3d634=_0x54bc45;if(!_0x25ccba)return;VisuMZ[_0x3d634(0x24f)]['Window_StatusBase_drawActorIcons'][_0x3d634(0x462)](this,_0x25ccba,_0x4f5961,_0x2d2bc3,_0x75e140),this[_0x3d634(0x1ea)](_0x25ccba,_0x4f5961,_0x2d2bc3,_0x75e140);},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x1ea)]=function(_0x5e615f,_0x3c0f0f,_0x3e6998,_0x530fc3){const _0x44df43=_0x54bc45;_0x530fc3=_0x530fc3||0x90;const _0x50c3f7=ImageManager[_0x44df43(0x2b8)],_0x4f4242=_0x5e615f[_0x44df43(0x1e2)]()[_0x44df43(0x52f)](0x0,Math['floor'](_0x530fc3/_0x50c3f7)),_0x32b7dc=_0x5e615f[_0x44df43(0x274)]()[_0x44df43(0x2a5)](_0x3cff7b=>_0x3cff7b['iconIndex']>0x0),_0x58ad52=[...Array(0x8)[_0x44df43(0x294)]()]['filter'](_0x8a062d=>_0x5e615f[_0x44df43(0x4f9)](_0x8a062d)!==0x0),_0x400918=[];let _0x43f84b=_0x3c0f0f;for(let _0x14b179=0x0;_0x14b179<_0x4f4242[_0x44df43(0x413)];_0x14b179++){this[_0x44df43(0x42c)]();const _0x12ae87=_0x32b7dc[_0x14b179];if(_0x12ae87){if(!_0x400918[_0x44df43(0x358)](_0x12ae87)){if(_0x44df43(0x2e5)!==_0x44df43(0x438))this[_0x44df43(0x3fc)](_0x5e615f,_0x12ae87,_0x43f84b,_0x3e6998);else{const _0x2da73e=this[_0x44df43(0x4e3)](_0x1258a2);this['addCommand'](_0x2da73e,_0x44df43(0x25a),!![],_0x5cd296);}}this['drawActorStateData'](_0x5e615f,_0x12ae87,_0x43f84b,_0x3e6998),_0x400918[_0x44df43(0x3d2)](_0x12ae87);}else{if(_0x44df43(0x4e0)==='NBRyc'){if(!_0x1969eb[_0x44df43(0x1e9)](_0x2dcd46))return![];}else{const _0xb50c4c=_0x58ad52[_0x14b179-_0x32b7dc[_0x44df43(0x413)]];this['drawActorBuffTurns'](_0x5e615f,_0xb50c4c,_0x43f84b,_0x3e6998),this[_0x44df43(0x457)](_0x5e615f,_0xb50c4c,_0x43f84b,_0x3e6998);}}_0x43f84b+=_0x50c3f7;}},Window_Base[_0x54bc45(0x4ff)][_0x54bc45(0x3fc)]=function(_0x276baf,_0x5b17ac,_0x2948e1,_0x53af0c){const _0x3038bb=_0x54bc45;if(!VisuMZ[_0x3038bb(0x24f)][_0x3038bb(0x429)][_0x3038bb(0x24e)][_0x3038bb(0x347)])return;if(!_0x276baf[_0x3038bb(0x2f0)](_0x5b17ac['id']))return;if(_0x5b17ac[_0x3038bb(0x368)]===0x0)return;if(_0x5b17ac[_0x3038bb(0x20d)]['match'](/<HIDE STATE TURNS>/i))return;const _0x177647=_0x276baf[_0x3038bb(0x371)](_0x5b17ac['id']),_0x2307a2=ImageManager['iconWidth'],_0x3aff60=ColorManager[_0x3038bb(0x3c8)](_0x5b17ac);this[_0x3038bb(0x383)](_0x3aff60),this[_0x3038bb(0x4e8)](_0x3038bb(0x356)),this[_0x3038bb(0x1e8)][_0x3038bb(0x4d4)]=!![],this[_0x3038bb(0x1e8)][_0x3038bb(0x4f1)]=VisuMZ[_0x3038bb(0x24f)][_0x3038bb(0x429)]['States'][_0x3038bb(0x4d3)],_0x2948e1+=VisuMZ['SkillsStatesCore'][_0x3038bb(0x429)][_0x3038bb(0x24e)]['TurnOffsetX'],_0x53af0c+=VisuMZ[_0x3038bb(0x24f)]['Settings']['States'][_0x3038bb(0x256)],this[_0x3038bb(0x425)](_0x177647,_0x2948e1,_0x53af0c,_0x2307a2,_0x3038bb(0x30e)),this['contents'][_0x3038bb(0x4d4)]=![],this[_0x3038bb(0x42c)]();},Window_Base['prototype'][_0x54bc45(0x479)]=function(_0x9af49e,_0x21649a,_0x289ec0,_0x497da1){const _0x476a44=_0x54bc45;if(!VisuMZ[_0x476a44(0x24f)]['Settings'][_0x476a44(0x24e)][_0x476a44(0x40c)])return;const _0x2767ec=ImageManager[_0x476a44(0x2b8)],_0x6f4833=ImageManager[_0x476a44(0x524)]/0x2,_0x4e3502=ColorManager[_0x476a44(0x339)]();this[_0x476a44(0x383)](_0x4e3502),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x476a44(0x1e8)]['fontBold']=!![],this[_0x476a44(0x1e8)][_0x476a44(0x4f1)]=VisuMZ['SkillsStatesCore'][_0x476a44(0x429)][_0x476a44(0x24e)][_0x476a44(0x279)],_0x289ec0+=VisuMZ['SkillsStatesCore'][_0x476a44(0x429)][_0x476a44(0x24e)][_0x476a44(0x373)],_0x497da1+=VisuMZ[_0x476a44(0x24f)][_0x476a44(0x429)][_0x476a44(0x24e)]['DataOffsetY'];const _0x1cbedc=String(_0x9af49e[_0x476a44(0x326)](_0x21649a['id']));this['drawText'](_0x1cbedc,_0x289ec0,_0x497da1,_0x2767ec,_0x476a44(0x2cf)),this['contents'][_0x476a44(0x4d4)]=![],this[_0x476a44(0x42c)]();},Window_Base[_0x54bc45(0x4ff)]['drawActorBuffTurns']=function(_0x5a4ec5,_0x37a772,_0x433872,_0x5ac501){const _0x2be551=_0x54bc45;if(!VisuMZ[_0x2be551(0x24f)]['Settings'][_0x2be551(0x21e)]['ShowTurns'])return;const _0x37bdcb=_0x5a4ec5[_0x2be551(0x4f9)](_0x37a772);if(_0x37bdcb===0x0)return;const _0x85bbf9=_0x5a4ec5[_0x2be551(0x4b1)](_0x37a772),_0xdc6771=ImageManager[_0x2be551(0x2b8)],_0x1bc1b6=_0x37bdcb>0x0?ColorManager[_0x2be551(0x37c)]():ColorManager['debuffColor']();this['changeTextColor'](_0x1bc1b6),this[_0x2be551(0x4e8)]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x2be551(0x4d4)]=!![],this[_0x2be551(0x1e8)][_0x2be551(0x4f1)]=VisuMZ['SkillsStatesCore'][_0x2be551(0x429)][_0x2be551(0x21e)]['TurnFontSize'],_0x433872+=VisuMZ[_0x2be551(0x24f)][_0x2be551(0x429)][_0x2be551(0x21e)][_0x2be551(0x2fa)],_0x5ac501+=VisuMZ[_0x2be551(0x24f)][_0x2be551(0x429)][_0x2be551(0x21e)][_0x2be551(0x256)],this[_0x2be551(0x425)](_0x85bbf9,_0x433872,_0x5ac501,_0xdc6771,'right'),this[_0x2be551(0x1e8)][_0x2be551(0x4d4)]=![],this[_0x2be551(0x42c)]();},Window_Base[_0x54bc45(0x4ff)]['drawActorBuffRates']=function(_0x25ba6a,_0x2130a2,_0x15604b,_0x544b81){const _0x35ee91=_0x54bc45;if(!VisuMZ['SkillsStatesCore'][_0x35ee91(0x429)][_0x35ee91(0x21e)][_0x35ee91(0x40c)])return;const _0x5909b5=_0x25ba6a[_0x35ee91(0x2bc)](_0x2130a2),_0x3fbf08=_0x25ba6a[_0x35ee91(0x4f9)](_0x2130a2),_0x1f2d08=ImageManager[_0x35ee91(0x2b8)],_0x2445c1=ImageManager[_0x35ee91(0x524)]/0x2,_0x3815d8=_0x3fbf08>0x0?ColorManager['buffColor']():ColorManager[_0x35ee91(0x4c5)]();this[_0x35ee91(0x383)](_0x3815d8),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x35ee91(0x1e8)][_0x35ee91(0x4d4)]=!![],this['contents'][_0x35ee91(0x4f1)]=VisuMZ[_0x35ee91(0x24f)]['Settings'][_0x35ee91(0x21e)][_0x35ee91(0x279)],_0x15604b+=VisuMZ[_0x35ee91(0x24f)][_0x35ee91(0x429)]['Buffs'][_0x35ee91(0x373)],_0x544b81+=VisuMZ[_0x35ee91(0x24f)][_0x35ee91(0x429)][_0x35ee91(0x21e)][_0x35ee91(0x39c)];const _0x217ba0=_0x35ee91(0x284)[_0x35ee91(0x47a)](Math[_0x35ee91(0x30a)](_0x5909b5*0x64));this[_0x35ee91(0x425)](_0x217ba0,_0x15604b,_0x544b81,_0x1f2d08,_0x35ee91(0x2cf)),this['contents'][_0x35ee91(0x4d4)]=![],this[_0x35ee91(0x42c)]();},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2e8)]=Window_StatusBase[_0x54bc45(0x4ff)][_0x54bc45(0x310)],Window_StatusBase[_0x54bc45(0x4ff)][_0x54bc45(0x310)]=function(_0xf8e3e2,_0x109a02,_0x1862bc,_0x5610f9){const _0x138e0a=_0x54bc45;if(_0xf8e3e2['isActor']())_0x109a02=this['convertGaugeTypeSkillsStatesCore'](_0xf8e3e2,_0x109a02);this[_0x138e0a(0x3c0)](_0xf8e3e2,_0x109a02,_0x1862bc,_0x5610f9);},Window_StatusBase[_0x54bc45(0x4ff)][_0x54bc45(0x3c0)]=function(_0x4c626c,_0x1b70dd,_0x262719,_0x1ee160){const _0x3d6081=_0x54bc45;if([_0x3d6081(0x1fe),_0x3d6081(0x2d2)]['includes'](_0x1b70dd[_0x3d6081(0x2de)]()))return;VisuMZ[_0x3d6081(0x24f)][_0x3d6081(0x2e8)][_0x3d6081(0x462)](this,_0x4c626c,_0x1b70dd,_0x262719,_0x1ee160);},Window_StatusBase[_0x54bc45(0x4ff)]['convertGaugeTypeSkillsStatesCore']=function(_0x2b9fbc,_0x58bae9){const _0x4827d0=_0x54bc45,_0xcb8448=_0x2b9fbc[_0x4827d0(0x477)]()[_0x4827d0(0x20d)];if(_0x58bae9==='hp'&&_0xcb8448[_0x4827d0(0x389)](/<REPLACE HP GAUGE:[ ](.*)>/i))return _0x4827d0(0x4bb)===_0x4827d0(0x4bb)?String(RegExp['$1']):_0x3508aa['status']&&_0x51cd0d['description'][_0x4827d0(0x358)]('['+_0x4118d0+']');else{if(_0x58bae9==='mp'&&_0xcb8448[_0x4827d0(0x389)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x58bae9==='tp'&&_0xcb8448[_0x4827d0(0x389)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x58bae9;}},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2ee)]=Window_StatusBase[_0x54bc45(0x4ff)]['drawActorIcons'],Window_StatusBase[_0x54bc45(0x4ff)][_0x54bc45(0x2f4)]=function(_0x5a2188,_0x4b4fe9,_0x4edcb4,_0x4ed158){const _0x276c04=_0x54bc45;if(!_0x5a2188)return;Window_Base[_0x276c04(0x4ff)][_0x276c04(0x2f4)][_0x276c04(0x462)](this,_0x5a2188,_0x4b4fe9,_0x4edcb4,_0x4ed158);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x400)]=Window_SkillType['prototype'][_0x54bc45(0x24c)],Window_SkillType[_0x54bc45(0x4ff)]['initialize']=function(_0x3850e9){const _0x89463b=_0x54bc45;VisuMZ[_0x89463b(0x24f)][_0x89463b(0x400)][_0x89463b(0x462)](this,_0x3850e9),this[_0x89463b(0x215)](_0x3850e9);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0x2093ed){const _0x29d81f=_0x54bc45,_0x47c8ad=new Rectangle(0x0,0x0,_0x2093ed[_0x29d81f(0x2ff)],_0x2093ed[_0x29d81f(0x2fb)]);this[_0x29d81f(0x407)]=new Window_Base(_0x47c8ad),this[_0x29d81f(0x407)][_0x29d81f(0x467)]=0x0,this[_0x29d81f(0x529)](this[_0x29d81f(0x407)]),this[_0x29d81f(0x4db)]();},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x406)]=function(){const _0x21e111=_0x54bc45;Window_Command[_0x21e111(0x4ff)][_0x21e111(0x406)]['call'](this);if(this[_0x21e111(0x407)])this[_0x21e111(0x4db)]();},Window_SkillType['prototype'][_0x54bc45(0x4db)]=function(){const _0x5c41e4=_0x54bc45,_0x4a58f8=this[_0x5c41e4(0x407)];_0x4a58f8[_0x5c41e4(0x1e8)][_0x5c41e4(0x2b5)]();const _0x5c803e=this[_0x5c41e4(0x23f)](this[_0x5c41e4(0x325)]());if(_0x5c803e===_0x5c41e4(0x1f0)&&this['maxItems']()>0x0){const _0xdb278f=this[_0x5c41e4(0x416)](this[_0x5c41e4(0x325)]());let _0x3cfd67=this[_0x5c41e4(0x22a)](this[_0x5c41e4(0x325)]());_0x3cfd67=_0x3cfd67[_0x5c41e4(0x3da)](/\\I\[(\d+)\]/gi,''),_0x4a58f8['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x3cfd67,_0xdb278f),this[_0x5c41e4(0x237)](_0x3cfd67,_0xdb278f),this['commandNameWindowCenter'](_0x3cfd67,_0xdb278f);}},Window_SkillType['prototype']['commandNameWindowDrawBackground']=function(_0x4b168d,_0x41d5e4){},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x237)]=function(_0x20038b,_0xa25315){const _0x482dfe=_0x54bc45,_0x5ee8f6=this[_0x482dfe(0x407)];_0x5ee8f6[_0x482dfe(0x425)](_0x20038b,0x0,_0xa25315['y'],_0x5ee8f6[_0x482dfe(0x3e8)],_0x482dfe(0x2cf));},Window_SkillType[_0x54bc45(0x4ff)]['commandNameWindowCenter']=function(_0x3e5ba5,_0x3e3471){const _0x138e9c=_0x54bc45,_0x352f09=this[_0x138e9c(0x407)],_0x3e2817=$gameSystem[_0x138e9c(0x316)](),_0x597dde=_0x3e3471['x']+Math[_0x138e9c(0x1fc)](_0x3e3471[_0x138e9c(0x2ff)]/0x2)+_0x3e2817;_0x352f09['x']=_0x352f09[_0x138e9c(0x2ff)]/-0x2+_0x597dde,_0x352f09['y']=Math[_0x138e9c(0x1fc)](_0x3e3471[_0x138e9c(0x2fb)]/0x2);},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x3f3)]=function(){const _0x52222b=_0x54bc45;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x52222b(0x4ff)][_0x52222b(0x3f3)]['call'](this);},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x52c)]=function(){const _0x36c86f=_0x54bc45;if(!this[_0x36c86f(0x2cb)])return;const _0x53ed4a=this[_0x36c86f(0x2cb)][_0x36c86f(0x28f)]();for(const _0x285e85 of _0x53ed4a){const _0x286e74=this[_0x36c86f(0x4e3)](_0x285e85);this[_0x36c86f(0x3ea)](_0x286e74,_0x36c86f(0x25a),!![],_0x285e85);}},Window_SkillType[_0x54bc45(0x4ff)]['makeCommandName']=function(_0x44c4cf){const _0x55f980=_0x54bc45;let _0x1c6574=$dataSystem[_0x55f980(0x28f)][_0x44c4cf];if(_0x1c6574[_0x55f980(0x389)](/\\I\[(\d+)\]/i))return _0x1c6574;if(this[_0x55f980(0x4b9)]()===_0x55f980(0x4fb))return _0x1c6574;const _0x15db54=VisuMZ[_0x55f980(0x24f)][_0x55f980(0x429)]['Skills'],_0x214440=$dataSystem[_0x55f980(0x34e)][_0x55f980(0x358)](_0x44c4cf),_0x59ad0d=_0x214440?_0x15db54[_0x55f980(0x328)]:_0x15db54['IconStypeNorm'];return'\x5cI[%1]%2'['format'](_0x59ad0d,_0x1c6574);},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x23c)]=function(){const _0x6c5162=_0x54bc45;return VisuMZ[_0x6c5162(0x24f)]['Settings'][_0x6c5162(0x2af)][_0x6c5162(0x361)];},Window_SkillType['prototype'][_0x54bc45(0x35b)]=function(_0x21534f){const _0x25e163=_0x54bc45,_0x33629a=this['commandStyleCheck'](_0x21534f);if(_0x33629a===_0x25e163(0x52a)){if(_0x25e163(0x487)===_0x25e163(0x230)){_0x23984a['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x539074=_0xda33ff[_0x25e163(0x336)](_0x4b6604(_0x5cbd10['$1'])['toUpperCase']()),_0x3b7e77=_0x3361a6(_0x403ef2['$2']);_0x539074>=0x0&&(_0x32f401[_0x25e163(0x470)](_0x539074,_0x3b7e77),this[_0x25e163(0x4a9)](_0x388e63));}else this[_0x25e163(0x483)](_0x21534f);}else{if(_0x33629a==='icon'){if(_0x25e163(0x227)==='CrtdS'){if(!_0x22cb40[_0x25e163(0x1e9)](_0x5a2b8d))return!![];}else this[_0x25e163(0x3e9)](_0x21534f);}else Window_Command['prototype'][_0x25e163(0x35b)]['call'](this,_0x21534f);}},Window_SkillType['prototype'][_0x54bc45(0x4b9)]=function(){const _0x461d8e=_0x54bc45;return VisuMZ[_0x461d8e(0x24f)][_0x461d8e(0x429)][_0x461d8e(0x2af)][_0x461d8e(0x1f7)];},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x23f)]=function(_0x50842d){const _0x550386=_0x54bc45;if(_0x50842d<0x0)return _0x550386(0x4fb);const _0x72e1d7=this[_0x550386(0x4b9)]();if(_0x72e1d7!==_0x550386(0x26e))return _0x72e1d7;else{if(this['maxItems']()>0x0){const _0x18dfbd=this[_0x550386(0x22a)](_0x50842d);if(_0x18dfbd[_0x550386(0x389)](/\\I\[(\d+)\]/i)){const _0x3a22b1=this[_0x550386(0x416)](_0x50842d),_0x1a25c2=this[_0x550386(0x1e4)](_0x18dfbd)[_0x550386(0x2ff)];return _0x1a25c2<=_0x3a22b1[_0x550386(0x2ff)]?_0x550386(0x26c)===_0x550386(0x30c)?![]:_0x550386(0x52a):_0x550386(0x1f0);}}}return _0x550386(0x4fb);},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x483)]=function(_0x433b14){const _0x2cd970=_0x54bc45,_0x5df31f=this['itemLineRect'](_0x433b14),_0x2e103c=this[_0x2cd970(0x22a)](_0x433b14),_0x4edaff=this[_0x2cd970(0x1e4)](_0x2e103c)[_0x2cd970(0x2ff)];this[_0x2cd970(0x44d)](this['isCommandEnabled'](_0x433b14));const _0x4dbf4f=this[_0x2cd970(0x23c)]();if(_0x4dbf4f===_0x2cd970(0x30e))this[_0x2cd970(0x260)](_0x2e103c,_0x5df31f['x']+_0x5df31f[_0x2cd970(0x2ff)]-_0x4edaff,_0x5df31f['y'],_0x4edaff);else{if(_0x4dbf4f===_0x2cd970(0x2cf)){const _0x23bea2=_0x5df31f['x']+Math[_0x2cd970(0x1fc)]((_0x5df31f[_0x2cd970(0x2ff)]-_0x4edaff)/0x2);this[_0x2cd970(0x260)](_0x2e103c,_0x23bea2,_0x5df31f['y'],_0x4edaff);}else this[_0x2cd970(0x260)](_0x2e103c,_0x5df31f['x'],_0x5df31f['y'],_0x4edaff);}},Window_SkillType[_0x54bc45(0x4ff)][_0x54bc45(0x3e9)]=function(_0x5cf51b){const _0x365560=_0x54bc45;this[_0x365560(0x22a)](_0x5cf51b)[_0x365560(0x389)](/\\I\[(\d+)\]/i);const _0x3af2c3=Number(RegExp['$1'])||0x0,_0x313369=this[_0x365560(0x416)](_0x5cf51b),_0x2f3550=_0x313369['x']+Math[_0x365560(0x1fc)]((_0x313369[_0x365560(0x2ff)]-ImageManager[_0x365560(0x2b8)])/0x2),_0x4dbd51=_0x313369['y']+(_0x313369[_0x365560(0x2fb)]-ImageManager['iconHeight'])/0x2;this[_0x365560(0x252)](_0x3af2c3,_0x2f3550,_0x4dbd51);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x348)]=Window_SkillStatus[_0x54bc45(0x4ff)][_0x54bc45(0x375)],Window_SkillStatus[_0x54bc45(0x4ff)][_0x54bc45(0x375)]=function(){const _0x3ba795=_0x54bc45;VisuMZ['SkillsStatesCore'][_0x3ba795(0x348)][_0x3ba795(0x462)](this);if(this['_actor'])this[_0x3ba795(0x533)]();},Window_SkillStatus[_0x54bc45(0x4ff)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x47f4e8=_0x54bc45;if(!Imported[_0x47f4e8(0x45e)])return;if(!Imported[_0x47f4e8(0x354)])return;const _0x422fda=this['gaugeLineHeight']();let _0x3b6b9e=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x3528e3=this[_0x47f4e8(0x3e8)]-_0x3b6b9e-0x2;if(_0x3528e3>=0x12c){if(_0x47f4e8(0x2c5)!==_0x47f4e8(0x2c5)){const _0x111a70=_0x365a21(_0x5819f1['$1']);_0x111a70<_0x508e9c?(_0x37c44d(_0x47f4e8(0x4ae)[_0x47f4e8(0x47a)](_0x42ccee,_0x111a70,_0xfb24f1)),_0x150b87['exit']()):_0x4c46a4=_0x54edbb[_0x47f4e8(0x397)](_0x111a70,_0x2d7d43);}else{const _0x2a76d6=VisuMZ[_0x47f4e8(0x22f)]['Settings'][_0x47f4e8(0x2bd)][_0x47f4e8(0x426)],_0x33916a=Math[_0x47f4e8(0x1fc)](_0x3528e3/0x2)-0x18;let _0x392bf8=_0x3b6b9e,_0x3876e0=Math['floor']((this['innerHeight']-Math[_0x47f4e8(0x493)](_0x2a76d6[_0x47f4e8(0x413)]/0x2)*_0x422fda)/0x2),_0x8bd364=0x0;for(const _0x42d3cc of _0x2a76d6){this[_0x47f4e8(0x3b6)](_0x392bf8,_0x3876e0,_0x33916a,_0x42d3cc),_0x8bd364++,_0x8bd364%0x2===0x0?(_0x392bf8=_0x3b6b9e,_0x3876e0+=_0x422fda):_0x392bf8+=_0x33916a+0x18;}}}this[_0x47f4e8(0x42c)]();},Window_SkillStatus[_0x54bc45(0x4ff)][_0x54bc45(0x3b6)]=function(_0x3c5c52,_0x4d989d,_0x5d9eea,_0x3182f6){const _0x24ee0e=_0x54bc45,_0x5aba33=this[_0x24ee0e(0x458)]();this[_0x24ee0e(0x42c)](),this['drawParamText'](_0x3c5c52,_0x4d989d,_0x5d9eea,_0x3182f6,!![]),this['resetTextColor'](),this[_0x24ee0e(0x1e8)][_0x24ee0e(0x4f1)]-=0x8;const _0x2536cb=this[_0x24ee0e(0x2cb)][_0x24ee0e(0x2a4)](_0x3182f6,!![]);this[_0x24ee0e(0x1e8)][_0x24ee0e(0x425)](_0x2536cb,_0x3c5c52,_0x4d989d,_0x5d9eea,_0x5aba33,'right');},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x3aa)]=Window_SkillList['prototype']['includes'],Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x358)]=function(_0x5e7fef){const _0x1f743a=_0x54bc45;return this[_0x1f743a(0x331)](_0x5e7fef);},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x504)]=Window_SkillList[_0x54bc45(0x4ff)]['maxCols'],Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x475)]=function(){const _0x1f2ea4=_0x54bc45;return SceneManager['_scene'][_0x1f2ea4(0x4c2)]===Scene_Battle?VisuMZ[_0x1f2ea4(0x24f)]['Window_SkillList_maxCols'][_0x1f2ea4(0x462)](this):VisuMZ[_0x1f2ea4(0x24f)]['Settings'][_0x1f2ea4(0x2af)][_0x1f2ea4(0x300)];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x205)]=Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x481)],Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x481)]=function(_0x3a9526){const _0xee3aec=_0x54bc45,_0x1f0c57=this[_0xee3aec(0x2cb)]!==_0x3a9526;VisuMZ[_0xee3aec(0x24f)]['Window_SkillList_setActor']['call'](this,_0x3a9526),_0x1f0c57&&(this['_statusWindow']&&this[_0xee3aec(0x1ee)][_0xee3aec(0x4c2)]===Window_ShopStatus&&(_0xee3aec(0x251)!==_0xee3aec(0x2f3)?this[_0xee3aec(0x1ee)]['setItem'](this['itemAt'](0x0)):this[_0xee3aec(0x333)](_0x35cf03)));},Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x28e)]=function(_0x4df358){const _0x4d64a2=_0x54bc45;if(this[_0x4d64a2(0x4ca)]===_0x4df358)return;this[_0x4d64a2(0x4ca)]=_0x4df358,this[_0x4d64a2(0x375)](),this['scrollTo'](0x0,0x0),this[_0x4d64a2(0x1ee)]&&this[_0x4d64a2(0x1ee)][_0x4d64a2(0x4c2)]===Window_ShopStatus&&this[_0x4d64a2(0x1ee)]['setItem'](this['itemAt'](0x0));},Window_SkillList[_0x54bc45(0x4ff)]['includesSkillsStatesCore']=function(_0x3b5c4b){const _0x36843e=_0x54bc45;if(!_0x3b5c4b)return VisuMZ['SkillsStatesCore'][_0x36843e(0x3aa)][_0x36843e(0x462)](this,_0x3b5c4b);if(!this[_0x36843e(0x403)](_0x3b5c4b))return![];if(!this[_0x36843e(0x37a)](_0x3b5c4b))return![];if(!this[_0x36843e(0x4a7)](_0x3b5c4b))return![];return!![];},Window_SkillList['prototype'][_0x54bc45(0x403)]=function(_0x36fd1f){const _0x1ffa66=_0x54bc45;return DataManager[_0x1ffa66(0x486)](_0x36fd1f)['includes'](this[_0x1ffa66(0x4ca)]);},Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x37a)]=function(_0x497b62){const _0x46abeb=_0x54bc45;if(!VisuMZ['SkillsStatesCore'][_0x46abeb(0x2e7)](this['_actor'],_0x497b62))return![];if(!VisuMZ[_0x46abeb(0x24f)]['CheckVisibleSwitchNotetags'](this['_actor'],_0x497b62))return![];if(!VisuMZ[_0x46abeb(0x24f)][_0x46abeb(0x4d9)](this['_actor'],_0x497b62))return![];return!![];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x2e7)]=function(_0x9efc87,_0x4750ab){const _0x3742ea=_0x54bc45,_0x58d084=_0x4750ab[_0x3742ea(0x20d)];if(_0x58d084[_0x3742ea(0x389)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3742ea(0x48e)]())return![];else{if(_0x58d084['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x3742ea(0x48e)]()){if(_0x3742ea(0x447)!=='QcNft')return![];else _0x3e1838=_0x53d64a(_0x21b429['$1']),_0x227dac=_0x467905(_0x4affca['$2']);}else{if(_0x3742ea(0x226)!=='nFTTE'){const _0x40b882=_0x237606[_0x3742ea(0x24f)][_0x3742ea(0x429)][_0x3742ea(0x4c8)];return _0x40b882['LabelFontMainType']===_0x3742ea(0x2cd)?_0x396774['mainFontSize']()-0x6:_0x517f42['mainFontSize']()-0x2;}else return!![];}}},VisuMZ['SkillsStatesCore'][_0x54bc45(0x1f4)]=function(_0x51bf6e,_0x26c409){const _0x2a44d2=_0x54bc45,_0xea3d8b=_0x26c409['note'];if(_0xea3d8b[_0x2a44d2(0x389)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d49b1=JSON[_0x2a44d2(0x346)]('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0x5b7e38 of _0x5d49b1){if(!$gameSwitches['value'](_0x5b7e38))return![];}return!![];}if(_0xea3d8b['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28dcf8=JSON['parse']('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0x83a78 of _0x28dcf8){if(_0x2a44d2(0x201)!==_0x2a44d2(0x201)){const _0x34317a=this[_0x2a44d2(0x250)][_0x1b43eb];_0x2414a1[_0x2a44d2(0x24f)][_0x2a44d2(0x456)][_0x2a44d2(0x462)](this,_0x1ee506);if(_0x34317a>0x0)this['onEraseBuff'](_0x2b40be);if(_0x34317a<0x0)this[_0x2a44d2(0x357)](_0x37757c);}else{if(!$gameSwitches[_0x2a44d2(0x448)](_0x83a78))return![];}}return!![];}if(_0xea3d8b[_0x2a44d2(0x389)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x61c0b3=JSON[_0x2a44d2(0x346)]('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0xaf4e17 of _0x61c0b3){if($gameSwitches['value'](_0xaf4e17))return!![];}return![];}if(_0xea3d8b[_0x2a44d2(0x389)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32e66c=JSON[_0x2a44d2(0x346)]('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0x4c9759 of _0x32e66c){if(!$gameSwitches['value'](_0x4c9759))return!![];}return![];}if(_0xea3d8b[_0x2a44d2(0x389)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2a44d2(0x37b)!==_0x2a44d2(0x3ed)){const _0x4970a1=JSON['parse']('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0x523645 of _0x4970a1){if(!$gameSwitches['value'](_0x523645))return!![];}return![];}else this['_statusWindow']&&this['_statusWindow'][_0x2a44d2(0x4c2)]===_0x4dd2eb&&this[_0x2a44d2(0x1ee)][_0x2a44d2(0x28b)](this[_0x2a44d2(0x243)](0x0));}if(_0xea3d8b['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xaf5fc0=JSON[_0x2a44d2(0x346)]('['+RegExp['$1'][_0x2a44d2(0x389)](/\d+/g)+']');for(const _0x5bf84e of _0xaf5fc0){if($gameSwitches[_0x2a44d2(0x448)](_0x5bf84e))return![];}return!![];}return!![];},VisuMZ[_0x54bc45(0x24f)][_0x54bc45(0x4d9)]=function(_0x2f09ce,_0x413769){const _0x94663=_0x54bc45,_0xddff2e=_0x413769[_0x94663(0x20d)];if(_0xddff2e[_0x94663(0x389)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x94663(0x3c4)!==_0x94663(0x319)){const _0x17741b=JSON[_0x94663(0x346)]('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x166c4a of _0x17741b){if(_0x94663(0x20a)!==_0x94663(0x20a))this[_0x94663(0x4d6)][_0x94663(0x4e5)][_0x94663(0x3d2)](_0x1816bd);else{if(!_0x2f09ce[_0x94663(0x1e9)](_0x166c4a))return![];}}return!![];}else return _0x839e80['mainFontSize']()-0x2;}else{if(_0xddff2e[_0x94663(0x389)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x860e19=RegExp['$1'][_0x94663(0x350)](',');for(const _0x5eeb96 of _0x860e19){const _0x5626cc=DataManager[_0x94663(0x49f)](_0x5eeb96);if(!_0x5626cc)continue;if(!_0x2f09ce[_0x94663(0x1e9)](_0x5626cc))return![];}return!![];}}if(_0xddff2e[_0x94663(0x389)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x94663(0x268)===_0x94663(0x268)){const _0x30f2bc=JSON[_0x94663(0x346)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5471a7 of _0x30f2bc){if(_0x94663(0x47d)!==_0x94663(0x47d)){const _0x495aed=this[_0x94663(0x28f)](),_0x44d723=_0x5720c7['getSkillTypes'](_0x521025),_0x4a19fe=_0x495aed[_0x94663(0x2a5)](_0x175f8e=>_0x44d723[_0x94663(0x358)](_0x175f8e));return _0x4a19fe[_0x94663(0x413)]>0x0;}else{if(!_0x2f09ce['isLearnedSkill'](_0x5471a7))return![];}}return!![];}else this[_0x94663(0x1e8)]['drawText'](_0x5db4a5,_0x490b72,_0x21a1f4,_0x7b3c6c,this['contents'][_0x94663(0x2fb)],_0x2c70e3);}else{if(_0xddff2e['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b0e96=RegExp['$1'][_0x94663(0x350)](',');for(const _0x162636 of _0x5b0e96){const _0x4c649b=DataManager[_0x94663(0x49f)](_0x162636);if(!_0x4c649b)continue;if(!_0x2f09ce['isLearnedSkill'](_0x4c649b))return![];}return!![];}}if(_0xddff2e[_0x94663(0x389)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('AuDGm'==='AuDGm'){const _0x4429a9=JSON['parse']('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x5cd64a of _0x4429a9){if(_0x2f09ce[_0x94663(0x1e9)](_0x5cd64a))return!![];}return![];}else{_0x3a021e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x59b0a8=_0x33c133(_0xdd806b['$1']);_0x8d0a4b['removeStatesByCategoryAll'](_0x59b0a8);}}else{if(_0xddff2e[_0x94663(0x389)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4db902=RegExp['$1'][_0x94663(0x350)](',');for(const _0x265fe8 of _0x4db902){if(_0x94663(0x3e6)===_0x94663(0x25e))this['_colorCache'][_0x37664f]='#%1'['format'](_0x3500b8(_0x1bec92['$1']));else{const _0x5680d3=DataManager[_0x94663(0x49f)](_0x265fe8);if(!_0x5680d3)continue;if(_0x2f09ce[_0x94663(0x1e9)](_0x5680d3))return!![];}}return![];}}if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a6d93=JSON['parse']('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x593327 of _0x5a6d93){if(!_0x2f09ce['isLearnedSkill'](_0x593327))return!![];}return![];}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x94663(0x36d)===_0x94663(0x36d)){const _0x50a376=RegExp['$1']['split'](',');for(const _0x169688 of _0x50a376){if('Kuqmn'!==_0x94663(0x484)){_0x203b6f[_0x94663(0x389)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2d11ad=_0x1c9aca[_0x94663(0x336)](_0x202ff7(_0x2cd7da['$1'])['toUpperCase']()),_0x5cb74a=_0x4d7aec(_0x367c10['$2']);_0x2d11ad>=0x0&&(_0x4f492b[_0x94663(0x3f8)](_0x2d11ad,_0x5cb74a),this['makeSuccess'](_0x358268));}else{const _0x5d0d9b=DataManager['getSkillIdWithName'](_0x169688);if(!_0x5d0d9b)continue;if(!_0x2f09ce[_0x94663(0x1e9)](_0x5d0d9b))return!![];}}return![];}else{const _0x3928bf=_0x2c4404[_0x94663(0x389)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x3928bf)for(const _0xe48a21 of _0x3928bf){_0xe48a21[_0x94663(0x389)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4fe3ae=_0x45c94a(_0x599933['$1']),_0x366791=_0x4ad503(_0x13f42d['$2']);_0x344592['removeStatesByCategory'](_0x4fe3ae,_0x366791);}}}}if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x94663(0x39d)!==_0x94663(0x39d)){let _0x3a2b15=[this[_0x94663(0x262)](),this[_0x94663(0x477)]()];_0x3a2b15=_0x3a2b15[_0x94663(0x42f)](this[_0x94663(0x3b9)]()[_0x94663(0x2a5)](_0xfd081b=>_0xfd081b));for(const _0x117475 of this[_0x94663(0x52b)]){const _0x5a181e=_0x4bd274[_0x117475];if(_0x5a181e)_0x3a2b15[_0x94663(0x3d2)](_0x5a181e);}return _0x3a2b15;}else{const _0x270858=JSON['parse']('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x10867a of _0x270858){if('AIHMI'!=='AIHMI'){if(!_0x3255a4)return;_0x487115['prototype'][_0x94663(0x2f4)][_0x94663(0x462)](this,_0x42e4c1,_0x57de2f,_0x2a5867,_0x1e72d7);}else{if(!_0x2f09ce[_0x94663(0x1e9)](_0x10867a))return!![];}}return![];}}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x94663(0x2f5)===_0x94663(0x2f5)){const _0x18a55b=RegExp['$1'][_0x94663(0x350)](',');for(const _0x4e95ec of _0x18a55b){if(_0x94663(0x43b)!==_0x94663(0x43b))this[_0x94663(0x330)]='';else{const _0x2784d2=DataManager[_0x94663(0x49f)](_0x4e95ec);if(!_0x2784d2)continue;if(!_0x2f09ce[_0x94663(0x1e9)](_0x2784d2))return!![];}}return![];}else return _0x1bde55(_0x4daad8['$1']);}}if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24e5ab=JSON[_0x94663(0x346)]('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x461d44 of _0x24e5ab){if(_0x94663(0x38e)===_0x94663(0x38e)){if(_0x2f09ce['isLearnedSkill'](_0x461d44))return![];}else{const _0x5d51e5=_0x33ce65['priority'],_0x285885=_0x1d5512[_0x94663(0x51d)];if(_0x5d51e5!==_0x285885)return _0x285885-_0x5d51e5;return _0x1a33fb-_0x22f59d;}}return!![];}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x61f2e1=RegExp['$1'][_0x94663(0x350)](',');for(const _0xe1dddc of _0x61f2e1){const _0x514ae9=DataManager['getSkillIdWithName'](_0xe1dddc);if(!_0x514ae9)continue;if(_0x2f09ce[_0x94663(0x1e9)](_0x514ae9))return![];}return!![];}}if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17fc64=JSON[_0x94663(0x346)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d8306 of _0x17fc64){if(_0x94663(0x4d0)===_0x94663(0x4d0)){if(!_0x2f09ce[_0x94663(0x264)](_0x3d8306))return![];}else this[_0x94663(0x1f9)][_0x5b1495]--;}return!![];}else{if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1df747=RegExp['$1']['split'](',');for(const _0x47ed59 of _0x1df747){const _0x1ef5f1=DataManager[_0x94663(0x49f)](_0x47ed59);if(!_0x1ef5f1)continue;if(!_0x2f09ce[_0x94663(0x264)](_0x1ef5f1))return![];}return!![];}}if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('RYUwb'!=='EJTSe'){const _0xf20eb3=JSON[_0x94663(0x346)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x42b742 of _0xf20eb3){if(!_0x2f09ce[_0x94663(0x264)](_0x42b742))return![];}return!![];}else{if(_0x2f10b9[_0x94663(0x1e9)](_0x239a14))return!![];}}else{if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2944f4=RegExp['$1'][_0x94663(0x350)](',');for(const _0xe9bfb7 of _0x2944f4){const _0x2668c7=DataManager[_0x94663(0x49f)](_0xe9bfb7);if(!_0x2668c7)continue;if(!_0x2f09ce[_0x94663(0x264)](_0x2668c7))return![];}return!![];}}if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x408281=JSON[_0x94663(0x346)]('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x44de04 of _0x408281){if(_0x2f09ce[_0x94663(0x264)](_0x44de04))return!![];}return![];}else{if(_0xddff2e[_0x94663(0x389)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4d3fbd=RegExp['$1'][_0x94663(0x350)](',');for(const _0x29f64f of _0x4d3fbd){const _0x8e23f8=DataManager[_0x94663(0x49f)](_0x29f64f);if(!_0x8e23f8)continue;if(_0x2f09ce[_0x94663(0x264)](_0x8e23f8))return!![];}return![];}}if(_0xddff2e[_0x94663(0x389)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('uLcPK'!==_0x94663(0x302)){const _0x5469d7=JSON[_0x94663(0x346)]('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x2afd1b of _0x5469d7){if(!_0x2f09ce['hasSkill'](_0x2afd1b))return!![];}return![];}else _0x367292+=_0x5dee15+0x18;}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x19d6d5=RegExp['$1'][_0x94663(0x350)](',');for(const _0x3cd6ed of _0x19d6d5){if(_0x94663(0x4a5)!==_0x94663(0x4a5)){let _0x475b5=_0x586482[_0x94663(0x4f6)][_0x94663(0x462)](this,_0x1899d1);return _0x475b5=this['adjustSkillCost'](_0x48ca36,_0x475b5,_0x40b62b),_0x475b5;}else{const _0x2e8556=DataManager['getSkillIdWithName'](_0x3cd6ed);if(!_0x2e8556)continue;if(!_0x2f09ce[_0x94663(0x264)](_0x2e8556))return!![];}}return![];}}if(_0xddff2e[_0x94663(0x389)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36dc17=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d7ac4 of _0x36dc17){if(!_0x2f09ce[_0x94663(0x264)](_0x3d7ac4))return!![];}return![];}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1d6c9c=RegExp['$1'][_0x94663(0x350)](',');for(const _0x5c3d96 of _0x1d6c9c){const _0xe82a14=DataManager['getSkillIdWithName'](_0x5c3d96);if(!_0xe82a14)continue;if(!_0x2f09ce[_0x94663(0x264)](_0xe82a14))return!![];}return![];}}if(_0xddff2e['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x94663(0x206)!==_0x94663(0x38b)){const _0x72f00b=JSON[_0x94663(0x346)]('['+RegExp['$1'][_0x94663(0x389)](/\d+/g)+']');for(const _0x465c89 of _0x72f00b){if(_0x2f09ce[_0x94663(0x264)](_0x465c89))return![];}return!![];}else _0x4b4f85[_0x94663(0x401)]=_0x5a547c(_0xb0118a['$1']);}else{if(_0xddff2e[_0x94663(0x389)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3634ba=RegExp['$1']['split'](',');for(const _0xb35e29 of _0x3634ba){const _0x5b37e9=DataManager[_0x94663(0x49f)](_0xb35e29);if(!_0x5b37e9)continue;if(_0x2f09ce[_0x94663(0x264)](_0x5b37e9))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x54bc45(0x4a7)]=function(_0xe76416){const _0x135eb9=_0x54bc45,_0x19fcd7=_0xe76416[_0x135eb9(0x20d)],_0x43b4fa=VisuMZ[_0x135eb9(0x24f)]['skillVisibleJS'];return _0x43b4fa[_0xe76416['id']]?_0x43b4fa[_0xe76416['id']][_0x135eb9(0x462)](this,_0xe76416):!![];},VisuMZ['SkillsStatesCore'][_0x54bc45(0x2fc)]=Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x35b)],Window_SkillList[_0x54bc45(0x4ff)]['drawItem']=function(_0x9b226e){const _0x15699a=_0x54bc45,_0x3d571d=this[_0x15699a(0x243)](_0x9b226e),_0xa9263=_0x3d571d?_0x3d571d['name']:'';if(_0x3d571d)this[_0x15699a(0x441)](_0x3d571d);VisuMZ['SkillsStatesCore'][_0x15699a(0x2fc)][_0x15699a(0x462)](this,_0x9b226e);if(_0x3d571d)_0x3d571d[_0x15699a(0x4c7)]=_0xa9263;},Window_SkillList[_0x54bc45(0x4ff)]['alterSkillName']=function(_0x15ae0a){const _0x1d994c=_0x54bc45;if(_0x15ae0a&&_0x15ae0a['note'][_0x1d994c(0x389)](/<LIST NAME:[ ](.*)>/i)){if('uCjWo'!==_0x1d994c(0x261)){_0x15ae0a[_0x1d994c(0x4c7)]=String(RegExp['$1'])[_0x1d994c(0x36a)]();for(;;){if(_0x1d994c(0x3e4)!=='CqIsU'){if(_0x15ae0a[_0x1d994c(0x4c7)][_0x1d994c(0x389)](/\\V\[(\d+)\]/gi))_0x15ae0a[_0x1d994c(0x4c7)]=_0x15ae0a[_0x1d994c(0x4c7)][_0x1d994c(0x3da)](/\\V\[(\d+)\]/gi,(_0x321fea,_0x2c3a4c)=>$gameVariables[_0x1d994c(0x448)](parseInt(_0x2c3a4c)));else{if('DNlMW'!==_0x1d994c(0x48b)){const _0x3e06ea=_0x2834bf['stateMaximumTurns'](_0x56b9da);this[_0x1d994c(0x1f9)][_0x7bc9f1]=_0x50110e[_0x1d994c(0x36f)](0x0,_0x3e06ea);if(this[_0x1d994c(0x1f9)][_0x3f0fb9]<=0x0)this[_0x1d994c(0x220)](_0x2ae924);}else break;}}else{const _0x2c47fd=_0x118536[_0x1d994c(0x346)]('['+_0x32bd2f['$1'][_0x1d994c(0x389)](/\d+/g)+']');for(const _0x56ea9b of _0x2c47fd){if(_0x473a30[_0x1d994c(0x1e9)](_0x56ea9b))return![];}return!![];}}}else return _0x1d994c(0x471);}},Window_SkillList[_0x54bc45(0x4ff)]['drawSkillCost']=function(_0x40a5ab,_0x29dcd8,_0x383c87,_0x4a210d){const _0x2cab1a=_0x54bc45;Window_Base[_0x2cab1a(0x4ff)][_0x2cab1a(0x4b3)][_0x2cab1a(0x462)](this,this[_0x2cab1a(0x2cb)],_0x40a5ab,_0x29dcd8,_0x383c87,_0x4a210d);},Window_SkillList[_0x54bc45(0x4ff)]['setStatusWindow']=function(_0x228748){const _0x24f54d=_0x54bc45;this[_0x24f54d(0x1ee)]=_0x228748,this[_0x24f54d(0x406)]();},VisuMZ[_0x54bc45(0x24f)]['Window_SkillList_updateHelp']=Window_SkillList[_0x54bc45(0x4ff)]['updateHelp'],Window_SkillList[_0x54bc45(0x4ff)][_0x54bc45(0x2be)]=function(){const _0x2b8d34=_0x54bc45;VisuMZ['SkillsStatesCore'][_0x2b8d34(0x21a)][_0x2b8d34(0x462)](this),this[_0x2b8d34(0x1ee)]&&this[_0x2b8d34(0x1ee)][_0x2b8d34(0x4c2)]===Window_ShopStatus&&this['_statusWindow'][_0x2b8d34(0x28b)](this['item']());};