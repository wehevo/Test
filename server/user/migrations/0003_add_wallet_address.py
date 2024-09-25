# yourapp/migrations/000X_add_wallet_address.py
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_username_user_first_name_user_last_name_and_more'),  # Replace with the last migration file number
    ]

    operations = [
        migrations.AddField(
            model_name='user',  # This should be 'user' for the default User model
            name='wallet_address',
            field=models.CharField(max_length=42, null=True, blank=True),  # Ethereum wallet address field
        ),
    ]
