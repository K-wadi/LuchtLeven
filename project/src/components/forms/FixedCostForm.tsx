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

const fixedCostSchema = z.object({
  date: z.date(),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive('Amount must be positive'),
  notes: z.string().optional(),
  recurring: z.boolean().default(true),
});

type FixedCostFormData = z.infer<typeof fixedCostSchema>;

const fixedCostCategories = [
  'Rent/Mortgage',
  'Insurance',
  'Subscriptions',
  'Utilities',
  'Internet/Phone',
  'Transportation',
  'Memberships',
  'Other',
];

export function FixedCostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FixedCostFormData>({
    resolver: zodResolver(fixedCostSchema),
  });

  const onSubmit = async (data: FixedCostFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement Firebase integration
      console.log('Fixed cost data:', data);
      reset();
    } catch (error) {
      console.error('Error submitting fixed cost:', error);
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
              {fixedCostCategories.map((category) => (
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
          <Label htmlFor="amount">Monthly Amount (€)</Label>
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

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            className="min-h-[100px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="recurring"
            {...register('recurring')}
            className="rounded border-gray-300"
          />
          <Label htmlFor="recurring">Recurring monthly expense</Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Fixed Cost'}
        </Button>
      </form>
    </Card>
  );
} 