import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const financialGoalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  targetAmount: z.number().positive('Target amount must be positive'),
  currentAmount: z.number().min(0, 'Current amount cannot be negative'),
  deadline: z.date(),
  notes: z.string().optional(),
});

type FinancialGoalFormData = z.infer<typeof financialGoalSchema>;

export function FinancialGoalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FinancialGoalFormData>({
    resolver: zodResolver(financialGoalSchema),
    defaultValues: {
      currentAmount: 0,
    },
  });

  const currentAmount = watch('currentAmount', 0);
  const targetAmount = watch('targetAmount', 0);
  const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

  const onSubmit = async (data: FinancialGoalFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement Firebase integration
      console.log('Financial goal data:', data);
      reset();
    } catch (error) {
      console.error('Error submitting financial goal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Goal Name</Label>
          <Input
            id="name"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
            placeholder="e.g., New Car Fund"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount (€)</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              {...register('targetAmount', { valueAsNumber: true })}
              className={errors.targetAmount ? 'border-red-500' : ''}
            />
            {errors.targetAmount && (
              <p className="text-sm text-red-500">{errors.targetAmount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount">Current Amount (€)</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              {...register('currentAmount', { valueAsNumber: true })}
              className={errors.currentAmount ? 'border-red-500' : ''}
            />
            {errors.currentAmount && (
              <p className="text-sm text-red-500">{errors.currentAmount.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Progress</Label>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600">
            {progress.toFixed(1)}% complete
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Target Date</Label>
          <Input
            id="deadline"
            type="date"
            {...register('deadline', { valueAsDate: true })}
            className={errors.deadline ? 'border-red-500' : ''}
          />
          {errors.deadline && (
            <p className="text-sm text-red-500">{errors.deadline.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            className="min-h-[100px]"
            placeholder="Add any additional details about your goal..."
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Financial Goal'}
        </Button>
      </form>
    </Card>
  );
} 