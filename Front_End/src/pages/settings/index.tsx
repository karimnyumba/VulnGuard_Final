"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { AuthService } from "@/services/authService"
import { useNotification } from "@/hooks/useNotification"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { usePasswordChange } from './hook/usePasswordChange'
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  Settings,
  Lock
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
  business: {
    id: string
    name: string
    phone: string
    description: string | null
    location: string | null
    createdAt: string
    updatedAt: string
  }
}

export default function SettingsPage() {
  const { user } = useAuth()
  const { success, error } = useNotification()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { form: passwordForm, isLoading: isPasswordLoading, onSubmit: onPasswordSubmit } = usePasswordChange()
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessPhone: '',
    businessDescription: '',
    businessLocation: ''
  })

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const response = await AuthService.getCurrentUser()
      setProfile(response)
      setFormData({
        name: response.name || '',
        businessName: response.business?.name || '',
        businessPhone: response.business?.phone || '',
        businessDescription: response.business?.description || '',
        businessLocation: response.business?.location || ''
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      error('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle save
  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Call the update profile API
      const response = await AuthService.updateProfile(
        formData.name,
        formData.businessName,
        formData.businessPhone,
        formData.businessDescription,
        formData.businessLocation
      )
      
      // Update the profile state with the response
      setProfile(response.user)
      
      success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      businessName: profile?.business?.name || '',
      businessPhone: profile?.business?.phone || '',
      businessDescription: profile?.business?.description || '',
      businessLocation: profile?.business?.location || ''
    })
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Profile not found</h3>
            <p className="text-gray-500">Unable to load your profile information.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account, profile, and security settings</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-gray-600">Manage your personal and business information</p>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Your personal account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={profile.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {profile.role}
                        </Badge>
                        {profile.isEmailVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Member since {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center mt-1">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <Input
                          id="email"
                          value={profile.email}
                          disabled
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        {isEditing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <Input
                            id="name"
                            value={profile.name || 'Not provided'}
                            disabled
                            className="bg-gray-50"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="flex items-center mt-1">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        {isEditing ? (
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            placeholder="Enter business name"
                          />
                        ) : (
                          <Input
                            id="businessName"
                            value={profile.business?.name || 'Not provided'}
                            disabled
                            className="bg-gray-50"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessPhone">Business Phone</Label>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {isEditing ? (
                          <Input
                            id="businessPhone"
                            value={formData.businessPhone}
                            onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                            placeholder="Enter business phone"
                          />
                        ) : (
                          <Input
                            id="businessPhone"
                            value={profile.business?.phone || 'Not provided'}
                            disabled
                            className="bg-gray-50"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessLocation">Business Location</Label>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        {isEditing ? (
                          <Input
                            id="businessLocation"
                            value={formData.businessLocation}
                            onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                            placeholder="Enter business location"
                          />
                        ) : (
                          <Input
                            id="businessLocation"
                            value={profile.business?.location || 'Not provided'}
                            disabled
                            className="bg-gray-50"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessDescription">Business Description</Label>
                      {isEditing ? (
                        <Textarea
                          id="businessDescription"
                          value={formData.businessDescription}
                          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                          placeholder="Enter business description"
                          rows={3}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                          <p className="text-sm text-gray-600">
                            {profile.business?.description || 'No description provided'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Security</h2>
              <p className="text-gray-600 mb-6">Manage your account security settings</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Information
                </CardTitle>
                <CardDescription>
                  Your account security status and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Email Verification</h4>
                        <p className="text-sm text-gray-500">
                          {profile.isEmailVerified 
                            ? 'Your email is verified' 
                            : 'Please verify your email address'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant={profile.isEmailVerified ? 'default' : 'destructive'}>
                      {profile.isEmailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Account Created</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(profile.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Last Updated</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(profile.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <p className="text-gray-600 mb-6">Update your account password</p>
            </div>

            <Card className="max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Password Settings
                </CardTitle>
                <CardDescription>
                  Change your account password for enhanced security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isPasswordLoading}>
                      {isPasswordLoading ? "Changing Password..." : "Change Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
} 