from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/app/', include('appSettings.urls')),
    path('api/v1.0/log/', include('logAPI.urls'))
]

# localhost:8000/admin/
# localhost:8000/api/v1.0/user/