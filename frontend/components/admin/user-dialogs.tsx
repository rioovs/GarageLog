"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { UserForm } from "./user-form"
import { User } from "@/lib/api/users"

interface UserDialogsProps {
  selectedUser: User | null
  isCreateOpen?: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  onClose: () => void
  onCreateSubmit?: (data: any) => Promise<void>
  onEditSubmit: (data: any) => Promise<void>
  onDeleteConfirm: () => Promise<void>
}

export function UserDialogs({
  selectedUser,
  isCreateOpen = false,
  isEditOpen,
  isDeleteOpen,
  onClose,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
}: UserDialogsProps) {
  if (!selectedUser && !isCreateOpen) return null

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. They will receive an email confirmation.
            </DialogDescription>
          </DialogHeader>
          {onCreateSubmit && <UserForm onSubmit={onCreateSubmit} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm 
              initialData={selectedUser} 
              onSubmit={onEditSubmit} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {selectedUser && (
                <span className="font-bold text-foreground mx-1">
                  {selectedUser.full_name} ({selectedUser.id})
                </span>
              )}
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
