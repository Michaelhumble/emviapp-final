
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSalonProfileCompletion } from '@/hooks/useSalonProfileCompletion';

export const SalonProfileCompletionCard = () => {
  const { completionPercentage, incompleteFields, isComplete, allFields } = useSalonProfileCompletion();

  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-purple-700">
            Profile Completion
          </CardTitle>
          <span className="text-sm font-medium">
            {completionPercentage}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress 
          value={completionPercentage} 
          className="h-2 mb-6" 
          indicatorClassName={
            isComplete ? "bg-green-500" : 
            completionPercentage >= 50 ? "bg-amber-500" : "bg-rose-500"
          }
        />
        
        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center text-green-600 text-sm font-medium"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Profile complete!
          </motion.div>
        ) : (
          <div className="space-y-2">
            {allFields.map(field => {
              const isIncomplete = incompleteFields.includes(field.label);
              return (
                <div key={field.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isIncomplete ? (
                      <Circle className="h-4 w-4 text-gray-300 mr-2" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    )}
                    <span className={`text-sm ${
                      isIncomplete ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {field.label}
                      {field.required && isIncomplete && (
                        <span className="text-rose-500 ml-1">*</span>
                      )}
                    </span>
                  </div>
                  {isIncomplete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-7 px-2"
                      asChild
                    >
                      <Link to={`/profile/edit?field=${field.id}`}>
                        Complete
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
