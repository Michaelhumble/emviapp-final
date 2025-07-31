import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface AvailabilitySettingsProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

interface AvailabilitySlot {
  id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const AvailabilitySettings: React.FC<AvailabilitySettingsProps> = ({
  open,
  onClose,
  onSave
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [availability, setAvailability] = useState<Record<string, AvailabilitySlot[]>>({});

  // Initialize with default availability
  useEffect(() => {
    if (open && user) {
      loadAvailability();
    }
  }, [open, user]);

  const loadAvailability = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('artist_availability')
        .select('*')
        .eq('artist_id', user.id);

      if (error) throw error;

      // Group by day of week
      const groupedData: Record<string, AvailabilitySlot[]> = {};
      DAYS_OF_WEEK.forEach(day => {
        groupedData[day] = data.filter(slot => slot.day_of_week === day) || [];
      });

      // Add default slots for days with no availability
      DAYS_OF_WEEK.forEach(day => {
        if (groupedData[day].length === 0) {
          groupedData[day] = [{
            day_of_week: day,
            start_time: '09:00',
            end_time: '17:00',
            is_available: true
          }];
        }
      });

      setAvailability(groupedData);
    } catch (error) {
      console.error('Error loading availability:', error);
      toast.error('Failed to load availability settings');
    } finally {
      setLoading(false);
    }
  };

  const addTimeSlot = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: [
        ...prev[day],
        {
          day_of_week: day,
          start_time: '09:00',
          end_time: '17:00',
          is_available: true
        }
      ]
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const updateTimeSlot = (day: string, index: number, field: keyof AvailabilitySlot, value: any) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Delete existing availability
      await supabase
        .from('artist_availability')
        .delete()
        .eq('artist_id', user.id);

      // Insert new availability
      const allSlots: Omit<AvailabilitySlot, 'id'>[] = [];
      Object.entries(availability).forEach(([day, slots]) => {
        slots.forEach(slot => {
          if (slot.is_available) {
            allSlots.push({
              day_of_week: day,
              start_time: slot.start_time,
              end_time: slot.end_time,
              is_available: slot.is_available
            });
          }
        });
      });

      if (allSlots.length > 0) {
        const { error } = await supabase
          .from('artist_availability')
          .insert(allSlots.map(slot => ({
            ...slot,
            artist_id: user.id
          })));

        if (error) throw error;
      }

      toast.success('Availability settings saved successfully!');
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Availability Settings
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center">Loading availability...</div>
        ) : (
          <div className="space-y-4">
            {DAYS_OF_WEEK.map(day => (
              <Card key={day} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{day}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addTimeSlot(day)}
                      className="h-8"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Slot
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {availability[day]?.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Switch
                          checked={slot.is_available}
                          onCheckedChange={(checked) => 
                            updateTimeSlot(day, index, 'is_available', checked)
                          }
                        />
                        
                        <div className="flex items-center gap-2 flex-1">
                          <div>
                            <Label className="text-xs">Start</Label>
                            <Input
                              type="time"
                              value={slot.start_time}
                              onChange={(e) => 
                                updateTimeSlot(day, index, 'start_time', e.target.value)
                              }
                              disabled={!slot.is_available}
                              className="w-24 h-8"
                            />
                          </div>
                          
                          <span className="text-gray-400">to</span>
                          
                          <div>
                            <Label className="text-xs">End</Label>
                            <Input
                              type="time"
                              value={slot.end_time}
                              onChange={(e) => 
                                updateTimeSlot(day, index, 'end_time', e.target.value)
                              }
                              disabled={!slot.is_available}
                              className="w-24 h-8"
                            />
                          </div>
                        </div>

                        {availability[day].length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTimeSlot(day, index)}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};