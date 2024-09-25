from django.urls import path
from user.views import loginView, registerView, CookieTokenRefreshView, logoutView, user, get_wallet_balance  # Ensure get_wallet_balance is imported

app_name = "user"

urlpatterns = [
    path('login', loginView),
    path('register', registerView),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logoutView),
    path('wallet-balance', get_wallet_balance, name='get_wallet_balance'),  # Removed extra comma
    path('user', user)
]
