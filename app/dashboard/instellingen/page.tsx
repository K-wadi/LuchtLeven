"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUserSettings } from "@/lib/local-storage"
import type { UserSettings } from "@/lib/types"

const LANGUAGES = [
  { value: "nl", label: "Nederlands" },
  { value: "en", label: "English" },
]

const CURRENCIES = [
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "GBP", label: "British Pound (£)" },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const { userSettings } = useStore()
  const [settings, setSettings] = useState<UserSettings>({
    theme: userSettings?.theme || "light",
    language: userSettings?.language || "nl",
    currency: userSettings?.currency || "EUR",
    notifications: {
      goalReminders: userSettings?.notifications?.goalReminders || true,
      expenseAlerts: userSettings?.notifications?.expenseAlerts || true,
      monthlyReport: userSettings?.notifications?.monthlyReport || true,
    },
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSave = async () => {
    if (!user) return

    try {
      await updateUserSettings(user.uid, settings)
      setSuccess("Instellingen succesvol opgeslagen")
      setError("")
    } catch (err) {
      setError("Er is een fout opgetreden bij het opslaan van de instellingen")
      setSuccess("")
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Instellingen</h1>
        <p className="text-muted-foreground">
          Pas je persoonlijke voorkeuren aan
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weergave</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Donker thema</Label>
              <Switch
                id="theme"
                checked={settings.theme === "dark"}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    theme: checked ? "dark" : "light",
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Taal</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een taal" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Valuta</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) =>
                  setSettings({ ...settings, currency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een valuta" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meldingen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="goalReminders">Doel herinneringen</Label>
              <Switch
                id="goalReminders"
                checked={settings.notifications.goalReminders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      goalReminders: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="expenseAlerts">Uitgaven waarschuwingen</Label>
              <Switch
                id="expenseAlerts"
                checked={settings.notifications.expenseAlerts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      expenseAlerts: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyReport">Maandelijks rapport</Label>
              <Switch
                id="monthlyReport"
                checked={settings.notifications.monthlyReport}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      monthlyReport: checked,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button onClick={handleSave}>Opslaan</Button>
      </div>
    </div>
  )
} 