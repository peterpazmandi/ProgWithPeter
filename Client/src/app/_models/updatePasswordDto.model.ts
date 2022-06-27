export interface UpdatePasswordDto {
    currentPassword: string;

    newPassword: string;
    confirmNewPassword: string;
}