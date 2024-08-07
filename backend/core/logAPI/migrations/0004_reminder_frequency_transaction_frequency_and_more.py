# Generated by Django 5.0.6 on 2024-07-07 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logAPI', '0003_remove_reminderlog_user_remove_spendlog_wallet_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='frequency',
            field=models.CharField(blank=True, choices=[('D', 'Daily'), ('W', 'Weekly'), ('M', 'Monthly'), ('Y', 'Yearly')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='frequency',
            field=models.CharField(blank=True, choices=[('D', 'Daily'), ('W', 'Weekly'), ('M', 'Monthly'), ('Y', 'Yearly')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.CharField(choices=[('SL', 'Salary'), ('GR', 'Groceries'), ('TR', 'Transport'), ('RE', 'Rent'), ('FD', 'Food'), ('EN', 'Entertainment'), ('TU', 'TopUp')], max_length=2),
        ),
    ]
