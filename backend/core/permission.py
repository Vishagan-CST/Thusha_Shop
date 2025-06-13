# core/permissions.py
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'

class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'doctor'

class IsManufacturer(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'manufacturer'

class IsDelivery(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'delivery'


class IsUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'user'
        