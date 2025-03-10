
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save, Bell, User, Shield, Palette, Globe } from "lucide-react";

export default function Settings() {
  const [generalForm, setGeneralForm] = useState({
    name: "Admin User",
    email: "admin@vendorwatch.com",
    language: "English"
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings updated",
      description: "Your profile settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Update your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={generalForm.name}
                    onChange={(e) => setGeneralForm({...generalForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={generalForm.email}
                    onChange={(e) => setGeneralForm({...generalForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    id="language" 
                    value={generalForm.language}
                    onValueChange={(value) => setGeneralForm({...generalForm, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive emails about account activity.
                  </span>
                </Label>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="product-notifs" className="flex flex-col space-y-1">
                  <span>Product Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get notified when a product is updated.
                  </span>
                </Label>
                <Switch id="product-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="vendor-notifs" className="flex flex-col space-y-1">
                  <span>Vendor Activity</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get notified about vendor updates and changes.
                  </span>
                </Label>
                <Switch id="vendor-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="sales-notifs" className="flex flex-col space-y-1">
                  <span>Sales Alerts</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive notifications about important sales milestones.
                  </span>
                </Label>
                <Switch id="sales-notifs" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save notification preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start text-left p-6 h-24">
                    <div className="space-y-1 text-left">
                      <div className="w-full h-3 rounded bg-primary mb-2"></div>
                      <h3 className="font-semibold">Light</h3>
                      <p className="text-xs text-muted-foreground">
                        Light colored theme
                      </p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start text-left p-6 h-24 bg-zinc-950 border-white/10 text-white">
                    <div className="space-y-1 text-left">
                      <div className="w-full h-3 rounded bg-white mb-2"></div>
                      <h3 className="font-semibold">Dark</h3>
                      <p className="text-xs text-zinc-400">
                        Dark colored theme
                      </p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start text-left p-6 h-24 bg-gradient-to-r from-zinc-950 to-zinc-800 text-white">
                    <div className="space-y-1 text-left">
                      <div className="w-full h-3 rounded bg-gradient-to-r from-white to-blue-500 mb-2"></div>
                      <h3 className="font-semibold">System</h3>
                      <p className="text-xs text-zinc-400">
                        Follow system theme
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="outline">Set up 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
