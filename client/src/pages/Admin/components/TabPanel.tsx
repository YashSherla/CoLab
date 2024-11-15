interface TabPanelProps {
    activeTab:string
}
export const TabPanel = ({activeTab}:TabPanelProps) =>{
    return (
        <div id="default-tab-content">
          {/* Tab Panels */}
          <div className={`${activeTab === "profile" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Profile</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "dashboard" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Dashboard</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "settings" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Settings</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "contacts" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Contacts</strong> tab's associated content.
            </p>
          </div>
        </div>
    )
}