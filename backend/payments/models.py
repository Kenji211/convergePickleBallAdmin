from django.db import models

class Booking(models.Model):
    reference = models.CharField(max_length=50, unique=True)
    amount = models.PositiveIntegerField()  # store in centavos
    payment_status = models.CharField(
        max_length=10,
        choices=[
            ('PENDING', 'Pending'),
            ('PAID', 'Paid'),
            ('FAILED', 'Failed')
        ],
        default='PENDING'
    )
    paymongo_link_id = models.CharField(max_length=100, blank=True, null=True)
    checkout_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reference} - {self.payment_status}"
