# Generated by Django 3.2.25 on 2024-07-30 07:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('logAPI', '0010_remove_reminder_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='reminders', to='userAPI.user'),
            preserve_default=False,
        ),
    ]
