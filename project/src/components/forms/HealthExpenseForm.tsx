import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const healthExpenseSchema = z.object({
  date: z.date(),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive('Amount must be positive'),
  provider: z.string().min(1, 'Provider is required'),
  notes: z.string().optional(),
  isReimbursed: z.boolean().default(false),
  reimbursementAmount: z.number().optional(),
});

type HealthExpenseFormData = z.infer<typeof healthExpenseSchema>;

const healthExpenseCategories = [
  'Doctor Visit',
  'Dental Care',
  'Medication',
  'Medical Equipment',
  'Health Insurance',
  'Alternative Medicine',
  'Mental Health',
  'Other',
];

export function HealthExpenseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<HealthExpenseFormData>({
    resolver: zodResolver(healthExpenseSchema),
  });

  const isReimbursed = watch('isReimbursed', false);

  const onSubmit = async (data: HealthExpenseFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement Firebase integration
      console.log('Health expense data:', data);
      reset();
    } catch (error) {
      console.error('Error submitting health expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register('date', { valueAsDate: true })}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              {...register('category')}
              className={errors.category ? 'border-red-500' : ''}
            >
              <option value="">Select a category</option>
              {healthExpenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="provider">Healthcare Provider</Label>
          <Input
            id="provider"
            {...register('provider')}
            className={errors.provider ? 'border-red-500' : ''}
            placeholder="e.g., Dr. Smith, Hospital Name"
          />
          {errors.provider && (
            <p className="text-sm text-red-500">{errors.provider.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (€)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isReimbursed"
            {...register('isReimbursed')}
            className="rounded border-gray-300"
          />
          <Label htmlFor="isReimbursed">This expense is reimbursed</Label>
        </div>

        {isReimbursed && (
          <div className="space-y-2">
            <Label htmlFor="reimbursementAmount">Reimbursement Amount (€)</Label>
            <Input
              id="reimbursementAmount"
              type="number"
              step="0.01"
              {...register('reimbursementAmount', { valueAsNumber: true })}
              className={errors.reimbursementAmount ? 'border-red-500' : ''}
            />
            {errors.reimbursementAmount && (
              <p className="text-sm text-red-500">{errors.reimbursementAmount.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            className="min-h-[100px]"
            placeholder="Add any additional details about the expense..."
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Health Expense'}
        </Button>
      </form>
    </Card>
  );
} 