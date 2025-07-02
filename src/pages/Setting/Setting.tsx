import { useState } from "react";
import {
  Settings,
  Save,
  RotateCcw,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";
import { SidebarTrigger } from "../../components/ui/sidebar";
import React from "react";

interface SettingsData {
  // General Settings
  siteName: string;
  siteDescription: string;
  timezone: string;
  language: string;
  dateFormat: string;

  // Security Settings
  sessionTimeout: string;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  twoFactorAuth: boolean;
  loginAttempts: number;

  // Email Settings
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: string;
  fromEmail: string;
  fromName: string;

  // Notification Settings
  emailNotifications: boolean;
  systemAlerts: boolean;
  userRegistration: boolean;
  tenantCreation: boolean;
  securityAlerts: boolean;

  // Database Settings
  backupFrequency: string;
  retentionPeriod: string;
  autoBackup: boolean;

  // Appearance Settings
  theme: string;
  primaryColor: string;
  logoUrl: string;
}

const initialSettings: SettingsData = {
  siteName: "Livo Admin Panel",
  siteDescription: "Multi-tenant SaaS administration platform",
  timezone: "UTC",
  language: "en",
  dateFormat: "MM/DD/YYYY",

  sessionTimeout: "30",
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  twoFactorAuth: false,
  loginAttempts: 5,

  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpUsername: "",
  smtpPassword: "",
  smtpEncryption: "TLS",
  fromEmail: "noreply@livo.com",
  fromName: "Livo Admin",

  emailNotifications: true,
  systemAlerts: true,
  userRegistration: true,
  tenantCreation: true,
  securityAlerts: true,

  backupFrequency: "daily",
  retentionPeriod: "30",
  autoBackup: true,

  theme: "light",
  primaryColor: "#1c4e80",
  logoUrl: "",
};

export function SettingsManagement() {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      const keys = field.split(".");
      let current: any = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return newSettings;
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving settings:", settings);
    setHasChanges(false);
    // Show success message
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setHasChanges(false);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "email", label: "Email", icon: Mail },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => handleInputChange("siteName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) => handleInputChange("timezone", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="EST">Eastern Time</SelectItem>
              <SelectItem value="PST">Pacific Time</SelectItem>
              <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteDescription">Site Description</Label>
        <Textarea
          id="siteDescription"
          value={settings.siteDescription}
          onChange={(e) => handleInputChange("siteDescription", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => handleInputChange("language", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select
            value={settings.dateFormat}
            onValueChange={(value) => handleInputChange("dateFormat", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleInputChange("sessionTimeout", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="loginAttempts">Max Login Attempts</Label>
          <Input
            id="loginAttempts"
            type="number"
            value={settings.loginAttempts}
            onChange={(e) =>
              handleInputChange(
                "loginAttempts",
                Number.parseInt(e.target.value)
              )
            }
          />
        </div>
      </div>

      <Card className="p-4">
        <h4 className="font-medium mb-4">Password Policy</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="minLength">Minimum Length</Label>
            <Input
              id="minLength"
              type="number"
              value={settings.passwordPolicy.minLength}
              onChange={(e) =>
                handleInputChange(
                  "passwordPolicy.minLength",
                  Number.parseInt(e.target.value)
                )
              }
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="requireUppercase">
                Require Uppercase Letters
              </Label>
              <Switch
                id="requireUppercase"
                checked={settings.passwordPolicy.requireUppercase}
                onCheckedChange={(checked) =>
                  handleInputChange("passwordPolicy.requireUppercase", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireNumbers">Require Numbers</Label>
              <Switch
                id="requireNumbers"
                checked={settings.passwordPolicy.requireNumbers}
                onCheckedChange={(checked) =>
                  handleInputChange("passwordPolicy.requireNumbers", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireSpecialChars">
                Require Special Characters
              </Label>
              <Switch
                id="requireSpecialChars"
                checked={settings.passwordPolicy.requireSpecialChars}
                onCheckedChange={(checked) =>
                  handleInputChange(
                    "passwordPolicy.requireSpecialChars",
                    checked
                  )
                }
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
          <p className="text-sm text-gray-500">
            Enable 2FA for enhanced security
          </p>
        </div>
        <Switch
          id="twoFactorAuth"
          checked={settings.twoFactorAuth}
          onCheckedChange={(checked) =>
            handleInputChange("twoFactorAuth", checked)
          }
        />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="smtpHost">SMTP Host</Label>
          <Input
            id="smtpHost"
            value={settings.smtpHost}
            onChange={(e) => handleInputChange("smtpHost", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtpPort">SMTP Port</Label>
          <Input
            id="smtpPort"
            value={settings.smtpPort}
            onChange={(e) => handleInputChange("smtpPort", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="smtpUsername">SMTP Username</Label>
          <Input
            id="smtpUsername"
            value={settings.smtpUsername}
            onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtpPassword">SMTP Password</Label>
          <div className="relative">
            <Input
              id="smtpPassword"
              type={showSmtpPassword ? "text" : "password"}
              value={settings.smtpPassword}
              onChange={(e) =>
                handleInputChange("smtpPassword", e.target.value)
              }
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowSmtpPassword(!showSmtpPassword)}
            >
              {showSmtpPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="smtpEncryption">Encryption</Label>
          <Select
            value={settings.smtpEncryption}
            onValueChange={(value) =>
              handleInputChange("smtpEncryption", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TLS">TLS</SelectItem>
              <SelectItem value="SSL">SSL</SelectItem>
              <SelectItem value="None">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fromEmail">From Email</Label>
          <Input
            id="fromEmail"
            type="email"
            value={settings.fromEmail}
            onChange={(e) => handleInputChange("fromEmail", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fromName">From Name</Label>
        <Input
          id="fromName"
          value={settings.fromName}
          onChange={(e) => handleInputChange("fromName", e.target.value)}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="emailNotifications"
            checked={settings.emailNotifications}
            onCheckedChange={(checked) =>
              handleInputChange("emailNotifications", checked)
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="systemAlerts">System Alerts</Label>
            <p className="text-sm text-gray-500">
              Get notified about system issues
            </p>
          </div>
          <Switch
            id="systemAlerts"
            checked={settings.systemAlerts}
            onCheckedChange={(checked) =>
              handleInputChange("systemAlerts", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="userRegistration">User Registration</Label>
            <p className="text-sm text-gray-500">
              Notifications when new users register
            </p>
          </div>
          <Switch
            id="userRegistration"
            checked={settings.userRegistration}
            onCheckedChange={(checked) =>
              handleInputChange("userRegistration", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="tenantCreation">Tenant Creation</Label>
            <p className="text-sm text-gray-500">
              Notifications when new tenants are created
            </p>
          </div>
          <Switch
            id="tenantCreation"
            checked={settings.tenantCreation}
            onCheckedChange={(checked) =>
              handleInputChange("tenantCreation", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="securityAlerts">Security Alerts</Label>
            <p className="text-sm text-gray-500">
              Important security notifications
            </p>
          </div>
          <Switch
            id="securityAlerts"
            checked={settings.securityAlerts}
            onCheckedChange={(checked) =>
              handleInputChange("securityAlerts", checked)
            }
          />
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="backupFrequency">Backup Frequency</Label>
          <Select
            value={settings.backupFrequency}
            onValueChange={(value) =>
              handleInputChange("backupFrequency", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
          <Input
            id="retentionPeriod"
            type="number"
            value={settings.retentionPeriod}
            onChange={(e) =>
              handleInputChange("retentionPeriod", e.target.value)
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="autoBackup">Automatic Backup</Label>
          <p className="text-sm text-gray-500">
            Enable automatic database backups
          </p>
        </div>
        <Switch
          id="autoBackup"
          checked={settings.autoBackup}
          onCheckedChange={(checked) =>
            handleInputChange("autoBackup", checked)
          }
        />
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Database className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Database Backup Information
            </h4>
            <p className="text-sm text-blue-800">
              Regular backups ensure your data is safe. Configure the frequency
              and retention period based on your needs. Automatic backups will
              run in the background without interrupting system operations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => handleInputChange("theme", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex gap-2">
            <Input
              id="primaryColor"
              value={settings.primaryColor}
              onChange={(e) =>
                handleInputChange("primaryColor", e.target.value)
              }
              className="flex-1"
            />
            <div
              className="w-10 h-10 rounded border border-gray-300"
              style={{ backgroundColor: settings.primaryColor }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input
          id="logoUrl"
          value={settings.logoUrl}
          onChange={(e) => handleInputChange("logoUrl", e.target.value)}
          placeholder="https://example.com/logo.png"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "email":
        return renderEmailSettings();
      case "notifications":
        return renderNotificationSettings();
      case "database":
        return renderDatabaseSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Trigger */}
            <div className="md:hidden">
              <SidebarTrigger className="h-8 w-8" />
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                System Settings
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base font-medium">
                Configure system preferences and security settings
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm sm:text-base font-semibold text-gray-900">
              John Admin
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Super Administrator
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {tabs.find((tab) => tab.id === activeTab)?.icon && (
                  <span className="h-5 w-5">
                    {React.createElement(
                      tabs.find((tab) => tab.id === activeTab)!.icon
                    )}
                  </span>
                )}
                {tabs.find((tab) => tab.id === activeTab)?.label} Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderTabContent()}
            </CardContent>
          </Card>

          {/* Tab Content */}
          {/* <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {tabs.find(tab => tab.id === activeTab)?.icon && (\
                  tabs.find(tab => tab.id === activeTab)!.icon className="h-5 w-5"
                )}
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderTabContent()}
            </CardContent>
          </Card> */}

          {/* Action Buttons */}
          {hasChanges && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleReset}
                className="sm:w-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Changes
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
