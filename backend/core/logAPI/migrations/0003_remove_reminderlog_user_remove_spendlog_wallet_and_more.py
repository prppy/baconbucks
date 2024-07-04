# Generated by Django 5.0.6 on 2024-07-04 13:29

import django.db.models.deletion
from decimal import Decimal
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logAPI', '0002_initial'),
        ('userAPI', '0004_alter_user_password_wallet'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reminderlog',
            name='user',
        ),
        migrations.RemoveField(
            model_name='spendlog',
            name='wallet',
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('repeating', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reminders', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Reminder',
                'verbose_name_plural': 'Reminders',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=10)),
                ('type', models.CharField(choices=[('SP', 'Spending'), ('EX', 'Expense')], max_length=2)),
                ('category', models.CharField(choices=[('SL', 'Salary'), ('GR', 'Groceries'), ('TR', 'Transport'), ('RE', 'Rent'), ('FD', 'Food'), ('EN', 'Entertainment')], max_length=2)),
                ('repeating', models.BooleanField(default=False)),
                ('wallet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='userAPI.wallet')),
            ],
        ),
        migrations.DeleteModel(
            name='EarnLog',
        ),
        migrations.DeleteModel(
            name='ReminderLog',
        ),
        migrations.DeleteModel(
            name='SpendLog',
        ),
    ]