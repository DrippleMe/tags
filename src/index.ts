import { logger } from "@vendetta";
import Settings from "./Settings";
import { React, getModule, getModuleByDisplayName, ReactDOM } from "@vendetta";
import { FormText, Forms } from "@vendetta/ui/components";

const { FormText } = Forms;

const CustomTagsPlugin = {
    onLoad: () => {
        logger.log("Custom Tags Plugin Loaded!");
        CustomTagsPlugin.injectTagUI();
    },
    onUnload: () => {
        logger.log("Custom Tags Plugin Unloaded.");
        CustomTagsPlugin.cleanup();
    },
    settings: Settings,
    
    // Function to inject the tag management UI
    injectTagUI: () => {
        const SettingsMenu = getModuleByDisplayName('SettingsMenu');
        if (!SettingsMenu) return;
        
        const CustomTagPanel = () => (
            <div className="custom-tags-settings">
                <h1>Custom Tags</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Enter user ID"
                        id="user-id-input"
                    />
                    <input
                        type="text"
                        placeholder="Enter tag"
                        id="tag-input"
                    />
                    <button onClick={() => CustomTagsPlugin.addTag()}>
                        Add Tag
                    </button>
                </div>
                <div id="tags-list">
                    {Object.entries(CustomTagsPlugin.settings.tags || {}).map(([userId, tag]) => (
                        <div key={userId}>
                            <span>{userId}: {tag}</span>
                            <button onClick={() => CustomTagsPlugin.removeTag(userId)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );

        // Render the CustomTagPanel into the settings menu
        ReactDOM.render(<CustomTagPanel />, document.querySelector('#app-mount'));
    },

    // Function to add a tag
    addTag: () => {
        const userId = (document.getElementById('user-id-input') as HTMLInputElement).value;
        const tag = (document.getElementById('tag-input') as HTMLInputElement).value;
        if (userId && tag) {
            CustomTagsPlugin.settings.tags = {
                ...CustomTagsPlugin.settings.tags,
                [userId]: tag
            };
            CustomTagsPlugin.saveSettings();
            CustomTagsPlugin.updateTagUI();
        }
    },

    // Function to remove a tag
    removeTag: (userId: string) => {
        const { [userId]: removedTag, ...rest } = CustomTagsPlugin.settings.tags;
        CustomTagsPlugin.settings.tags = rest;
        CustomTagsPlugin.saveSettings();
        CustomTagsPlugin.updateTagUI();
    },

    // Update the tag UI to reflect changes
    updateTagUI: () => {
        const settingsPanel = document.querySelector('.custom-tags-settings');
        if (settingsPanel) {
            ReactDOM.render(<CustomTagsPlugin.createSettingsPanel />, settingsPanel);
        }
    },

    // Function to save settings
    saveSettings: () => {
        // Save settings to storage
    },

    // Cleanup function to remove UI elements
    cleanup: () => {
        const settingsPanel = document.querySelector('.custom-tags-settings');
        if (settingsPanel) {
            settingsPanel.remove();
        }
    }
};

export default CustomTagsPlugin;
