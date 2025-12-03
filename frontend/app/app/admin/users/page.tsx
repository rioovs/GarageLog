"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { usersApi, User } from "@/lib/api/users"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { UserDialogs } from "@/components/admin/user-dialogs"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (error) {
      console.error("Failed to load users:", error)
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setIsCreateOpen(true)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const handleClose = () => {
    setIsCreateOpen(false)
    setIsEditOpen(false)
    setIsDeleteOpen(false)
    setTimeout(() => setSelectedUser(null), 300)
  }

  const onCreateSubmit = async (data: any) => {
    try {
      await usersApi.create(data)
      toast({
        title: "Success",
        description: "User created successfully",
      })
      handleClose()
      loadUsers()
    } catch (error: any) {
      console.error("Failed to create user:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const onEditSubmit = async (data: any) => {
    if (selectedUser) {
      try {
        await usersApi.update(selectedUser.id, data)
        toast({
          title: "Success",
          description: "User updated successfully",
        })
        handleClose()
        loadUsers()
      } catch (error) {
        console.error("Failed to update user:", error)
        toast({
          title: "Error",
          description: "Failed to update user",
          variant: "destructive",
        })
      }
    }
  }

  const onDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        await usersApi.delete(selectedUser.id)
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        handleClose()
        loadUsers()
      } catch (error) {
        console.error("Failed to delete user:", error)
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-2">Manage all users and permissions</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus size={18} />
            Add User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Users</p>
            <p className="text-3xl font-bold text-foreground">{users.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Active</p>
            <p className="text-3xl font-bold text-foreground">{users.filter((u) => u.is_active).length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Admins</p>
            <p className="text-3xl font-bold text-foreground">{users.filter((u) => u.role === "ADMIN").length}</p>
          </Card>
        </div>

        {/* Users Table */}
        {isLoading ? (
            <div className="text-center py-12">Loading users...</div>
        ) : users.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">No users yet</h2>
            <p className="text-muted-foreground mb-6">Users will appear here once they register.</p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Vehicles</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Created</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {user.full_name || "Unnamed"}
                        <div className="text-xs text-muted-foreground font-normal">{user.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm capitalize">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user._count?.vehicles || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <UserDialogs 
          selectedUser={selectedUser}
          isCreateOpen={isCreateOpen}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          onClose={handleClose}
          onCreateSubmit={onCreateSubmit}
          onEditSubmit={onEditSubmit}
          onDeleteConfirm={onDeleteConfirm}
        />
      </div>
    </div>
  )
}
