# Generated by Django 4.1.3 on 2023-01-02 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0005_alter_image_acquisition_alter_image_annotation_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='acquisition',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='annotation_url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='camera',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='exposure_details',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='filters',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='info',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='mount',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='name',
            field=models.CharField(blank=True, max_length=64, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='optic',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='processing',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='sqml',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
