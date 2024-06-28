from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', index),  # Add this line to handle the root URL
    path('admin/', admin.site.urls),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/app/', include('appSettings.urls'))
]

# localhost:8000/admin/
# localhost:8000/api/v1.0/user/