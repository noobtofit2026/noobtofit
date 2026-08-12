export const WORKOUT_DATA = {
  0: {
    title: 'Phase 0',
    subtitle: 'Beginner Foundation',
    color: '#a78bfa',
    duration: 'Week 0 — 3 Training Days',
    description:
      'Learn the essential movement patterns while getting comfortable in the gym. Train, recover, and build confidence before progressing.',
    showSkipWarning: true,

    weeks: {
      0: {
        title: 'Week 0 — Foundation Training',

        days: {
          1: {
            title: 'Day 1 — Full Body Foundation A',
            type: 'Full Body',
            exercises: [
              {
                name: 'Bodyweight Squats',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Feet comfortable width, chest up, knees track naturally over toes'
              },
              {
                name: 'Machine Chest Press',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Use a light weight. Learn the pressing path and control every rep'
              },
              {
                name: 'Lat Pulldown',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Pull toward upper chest without swinging or using momentum'
              },
              {
                name: 'Hip Hinge Drill',
                sets: 2,
                reps: '10',
                rest: '45s',
                note: 'Push hips back while keeping your spine neutral. Learn the hinge pattern'
              },
              {
                name: 'Plank',
                sets: 2,
                reps: '20-30s',
                rest: '45s',
                note: 'Brace your core and keep your body in a straight line'
              }
            ]
          },

          2: {
            title: 'Day 2 — Rest & Recovery',
            type: 'Rest',
            exercises: [
              {
                name: 'Light Walking',
                sets: 1,
                reps: '15-20 min',
                rest: '—',
                note: 'Easy pace. Stay active without creating fatigue'
              },
              {
                name: 'Optional Mobility',
                sets: 1,
                reps: '5-10 min',
                rest: '—',
                note: 'Gentle hip, shoulder and ankle mobility. Do not force stretches'
              }
            ]
          },

          3: {
            title: 'Day 3 — Full Body Foundation B',
            type: 'Full Body',
            exercises: [
              {
                name: 'Goblet Squat (light)',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Hold the dumbbell close to your chest and use a comfortable depth'
              },
              {
                name: 'Dumbbell Bench Press',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Use light dumbbells. Control the descent and press smoothly'
              },
              {
                name: 'Seated Cable Row',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Sit tall, pull toward your torso and control the return'
              },
              {
                name: 'Romanian Deadlift (light)',
                sets: 2,
                reps: '10',
                rest: '60s',
                note: 'Soft knees, push hips back and keep the weight close to your legs'
              },
              {
                name: 'Dead Bug',
                sets: 2,
                reps: '8 each',
                rest: '45s',
                note: 'Keep your lower back controlled against the floor throughout'
              }
            ]
          },

          4: {
            title: 'Day 4 — Rest & Recovery',
            type: 'Rest',
            exercises: [
              {
                name: 'Light Walking',
                sets: 1,
                reps: '15-20 min',
                rest: '—',
                note: 'Easy walking for general activity and recovery'
              },
              {
                name: 'Optional Mobility',
                sets: 1,
                reps: '5-10 min',
                rest: '—',
                note: 'Gentle mobility for hips, shoulders and ankles'
              }
            ]
          },

          5: {
            title: 'Day 5 — Full Body Foundation C',
            type: 'Full Body',
            exercises: [
              {
                name: 'Goblet Squat',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Use a comfortable weight and focus on consistent depth and control'
              },
              {
                name: 'Machine Chest Press',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Smooth reps with a controlled lowering phase'
              },
              {
                name: 'Lat Pulldown',
                sets: 2,
                reps: '10-12',
                rest: '60s',
                note: 'Keep your torso stable and focus on moving through the elbows'
              },
              {
                name: 'Hip Hinge / Light Romanian Deadlift',
                sets: 2,
                reps: '10',
                rest: '60s',
                note: 'Practice the hip hinge with a neutral spine and controlled movement'
              },
              {
                name: 'Plank',
                sets: 2,
                reps: '20-30s',
                rest: '45s',
                note: 'Brace your core without holding your breath or letting your hips sag'
              }
            ]
          },

          6: {
            title: 'Day 6 — Rest & Recovery',
            type: 'Rest',
            exercises: [
              {
                name: 'Light Walking',
                sets: 1,
                reps: '15-20 min',
                rest: '—',
                note: 'Keep the pace easy and comfortable'
              },
              {
                name: 'Optional Full Body Mobility',
                sets: 1,
                reps: '5-10 min',
                rest: '—',
                note: 'Gentle movement only. Recovery is the priority'
              }
            ]
          },

          7: {
            title: 'Day 7 — Complete Rest',
            type: 'Rest',
            exercises: [
              {
                name: 'Complete Rest',
                sets: 1,
                reps: 'Rest',
                rest: '—',
                note: 'Recover fully. Sleep well and prepare for the next phase'
              }
            ]
          }
        }
      }
    }
  },

  1: {
    title: 'Phase 1',
    subtitle: 'Foundation — Full Body',
    color: '#D4AF37',
    duration: 'Week 1 & 2',
    description:
      'Full body training 3 days a week with a rest day between sessions. Learn the main movement patterns and build a consistent base.',
    showSkipWarning: false,

    weeks: {
      1: {
        title: 'Week 1 — Full Body Foundation',

        days: {
          1: {
            title: 'Full Body Workout A',
            type: 'Full Body',
            exercises: [
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Use a comfortable range and keep the movement controlled' },
              { name: 'Bench Press', sets: 3, reps: '8-10', rest: '90s', note: 'Learn the basic pressing pattern and keep every rep controlled' },
              { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '75s', note: 'Pull toward the upper chest without swinging' },
              { name: 'Shoulder Press', sets: 2, reps: '10-12', rest: '75s', note: 'Keep the core stable and press through a comfortable range' },
              { name: 'Cable Row', sets: 2, reps: '10-12', rest: '60s', note: 'Pull the elbows back and control the return' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the elbows stable and control the full movement' }
            ]
          },

          2: {
            title: 'Full Body Workout B',
            type: 'Full Body',
            exercises: [
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled reps with a comfortable depth' },
              { name: 'Pec Dec Fly', sets: 3, reps: '10-12', rest: '75s', note: 'Use a controlled range and focus on bringing the arms together' },
              { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s', note: 'Keep the torso stable and pull the elbows back' },
              { name: 'Shoulder Press', sets: 2, reps: '10-12', rest: '75s', note: 'Use a comfortable range and avoid forcing the lockout' },
              { name: 'Lat Pulldown', sets: 2, reps: '10-12', rest: '60s', note: 'Control the stretch and pull without swinging' },
              { name: 'Dumbbell Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Use a controlled range without swinging' }
            ]
          },

          3: {
            title: 'Full Body Workout C',
            type: 'Full Body',
            exercises: [
              { name: 'Goblet Squat', sets: 3, reps: '10-12', rest: '75s', note: 'Hold the weight close to the chest and stay controlled' },
              { name: 'Machine Chest Press', sets: 3, reps: '10-12', rest: '90s', note: 'Learn the machine pressing pattern with controlled reps' },
              { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '75s', note: 'Use a comfortable grip and control both directions' },
              { name: 'Lateral Raise', sets: 2, reps: '12-15', rest: '60s', note: 'Use light weight and raise through a comfortable range' },
              { name: 'Cable Row', sets: 2, reps: '10-12', rest: '60s', note: 'Focus on controlled pulling rather than heavy weight' },
              { name: 'Dumbbell Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the upper arm stable and avoid swinging' }
            ]
          }
        }
      },

      2: {
        title: 'Week 2 — Full Body Progressive',

        days: {
          1: {
            title: 'Full Body Workout A',
            type: 'Full Body',
            exercises: [
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Add a small amount of weight only if all previous reps were controlled' },
              { name: 'Bench Press', sets: 3, reps: '8-10', rest: '90s', note: 'Progress with a small weight increase or extra reps while keeping form' },
              { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '75s', note: 'Progress gradually while keeping the body stable' },
              { name: 'Shoulder Press', sets: 2, reps: '10-12', rest: '75s', note: 'Increase weight only when the current load is comfortable' },
              { name: 'Cable Row', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the movement controlled throughout' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled reps with no body swing' }
            ]
          },

          2: {
            title: 'Full Body Workout B',
            type: 'Full Body',
            exercises: [
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Small progression if last session was comfortable' },
              { name: 'Pec Dec Fly', sets: 3, reps: '10-12', rest: '75s', note: 'Keep tension controlled through the full range' },
              { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s', note: 'Progress slowly while maintaining posture' },
              { name: 'Shoulder Press', sets: 2, reps: '10-12', rest: '75s', note: 'Controlled reps with a stable torso' },
              { name: 'Lat Pulldown', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the movement smooth and controlled' },
              { name: 'Dumbbell Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Progress only when you can avoid swinging' }
            ]
          },

          3: {
            title: 'Full Body Workout C',
            type: 'Full Body',
            exercises: [
              { name: 'Goblet Squat', sets: 3, reps: '10-12', rest: '75s', note: 'Progress the weight gradually while maintaining control' },
              { name: 'Machine Chest Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled pressing with a comfortable range' },
              { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '75s', note: 'Focus on smooth reps and controlled return' },
              { name: 'Lateral Raise', sets: 2, reps: '12-15', rest: '60s', note: 'Keep the weight light and movement controlled' },
              { name: 'Cable Row', sets: 2, reps: '10-12', rest: '60s', note: 'Focus on the back movement rather than the load' },
              { name: 'Dumbbell Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled reps with no swinging' }
            ]
          }
        }
      }
    }
  },

  2: {
    title: 'Phase 2',
    subtitle: 'Upper / Lower Split',
    color: '#60a5fa',
    duration: 'Week 3 & 4',
    description:
      'Four training days per week using an Upper / Lower split. Build strength and muscle while keeping recovery manageable.',
    showSkipWarning: false,

    weeks: {
      3: {
        title: 'Week 3 — Upper Lower Split',

        days: {
          1: {
            title: 'Upper Day A',
            type: 'Upper',
            exercises: [
              { name: 'Bench Press', sets: 3, reps: '8-10', rest: '90s', note: 'Main chest movement. Controlled reps and a stable setup' },
              { name: 'Lat Pulldown', sets: 3, reps: '8-12', rest: '90s', note: 'Pull smoothly and control the stretch at the top' },
              { name: 'Shoulder Press', sets: 2, reps: '8-12', rest: '75s', note: 'Keep the torso stable and use a comfortable range' },
              { name: 'Seated Cable Row / Single Arm Row', sets: 3, reps: '8-12', rest: '75s', note: 'Choose the available variation and focus on controlled pulling' },
              { name: 'Ez Bar Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the elbows stable and avoid swinging' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled extension with stable elbows' }
            ]
          },

          2: {
            title: 'Lower Day A',
            type: 'Lower',
            exercises: [
              { name: 'Squat', sets: 3, reps: '6-10', rest: '2min', note: 'Use a controlled depth and keep the movement stable' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled range without forcing the depth' },
              { name: 'Leg Curl', sets: 3, reps: '10-12', rest: '75s', note: 'Control both the curl and return' },
              { name: 'Leg Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Controlled quad-focused movement' }
            ]
          },

          3: {
            title: 'Upper Day B',
            type: 'Upper',
            exercises: [
              { name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', rest: '90s', note: 'Use a moderate incline and keep the movement controlled' },
              { name: 'Lat Pulldown', sets: 3, reps: '8-12', rest: '90s', note: 'Use a different comfortable grip if available' },
              { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', note: 'Light to moderate weight with controlled reps' },
              { name: 'Single Arm Row / Seated Cable Row', sets: 3, reps: '8-12', rest: '75s', note: 'Choose the available variation and keep the torso stable' },
              { name: 'Ez Bar Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled curls without swinging' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Use a comfortable attachment and control every rep' }
            ]
          },

          4: {
            title: 'Lower Day B',
            type: 'Lower',
            exercises: [
              { name: 'Squat', sets: 3, reps: '8-10', rest: '2min', note: 'Use a manageable load and prioritize consistent technique' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled reps through a comfortable range' },
              { name: 'Leg Curl', sets: 3, reps: '10-15', rest: '75s', note: 'Slow controlled return after each rep' },
              { name: 'Leg Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Controlled quad-focused finisher' }
            ]
          }
        }
      },

      4: {
        title: 'Week 4 — Upper Lower Progressive',

        days: {
          1: {
            title: 'Upper Day A',
            type: 'Upper',
            exercises: [
              { name: 'Bench Press', sets: 3, reps: '8-10', rest: '90s', note: 'Add a small amount of weight or reps if last week was comfortable' },
              { name: 'Lat Pulldown', sets: 3, reps: '8-12', rest: '90s', note: 'Progress gradually while keeping the movement controlled' },
              { name: 'Shoulder Press', sets: 2, reps: '8-12', rest: '75s', note: 'Keep the torso stable and avoid forcing the range' },
              { name: 'Seated Cable Row / Single Arm Row', sets: 3, reps: '8-12', rest: '75s', note: 'Progress only while maintaining control' },
              { name: 'Ez Bar Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled reps with stable elbows' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled extension without swinging' }
            ]
          },

          2: {
            title: 'Lower Day A',
            type: 'Lower',
            exercises: [
              { name: 'Squat', sets: 3, reps: '6-10', rest: '2min', note: 'Small progression only if technique remains consistent' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Progress gradually while maintaining control' },
              { name: 'Leg Curl', sets: 3, reps: '10-15', rest: '75s', note: 'Controlled reps and full comfortable range' },
              { name: 'Leg Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Keep the movement smooth and controlled' }
            ]
          },

          3: {
            title: 'Upper Day B',
            type: 'Upper',
            exercises: [
              { name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', rest: '90s', note: 'Progress weight or reps gradually while maintaining control' },
              { name: 'Lat Pulldown', sets: 3, reps: '8-12', rest: '90s', note: 'Use a comfortable grip and controlled tempo' },
              { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', note: 'Keep the weight manageable and avoid swinging' },
              { name: 'Single Arm Row / Seated Cable Row', sets: 3, reps: '8-12', rest: '75s', note: 'Choose the available variation and keep each rep controlled' },
              { name: 'Ez Bar Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled reps with no body swing' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-12', rest: '60s', note: 'Progress gradually while maintaining elbow position' }
            ]
          },

          4: {
            title: 'Lower Day B',
            type: 'Lower',
            exercises: [
              { name: 'Squat', sets: 3, reps: '8-10', rest: '2min', note: 'Keep the load manageable and technique consistent' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled reps through a comfortable range' },
              { name: 'Leg Curl', sets: 3, reps: '10-15', rest: '75s', note: 'Controlled movement with a comfortable stretch' },
              { name: 'Leg Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Controlled quad-focused work' }
            ]
          }
        }
      }
    }
  },

  3: {
    title: 'Phase 3',
    subtitle: 'Push / Pull Split',
    color: '#f97316',
    duration: 'Week 5 to Week 12',
    description:
      'Five training days per week with dedicated Push, Pull and Legs sessions. Progress gradually while keeping recovery in mind.',
    showSkipWarning: false,

    weeks: {
      5: {
        title: 'Week 5 — Training Split',

        days: {
          1: {
            title: 'Monday — Push',
            type: 'Push',
            exercises: [
              { name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', rest: '90s', note: 'Upper chest focused press. Use a comfortable incline and controlled reps' },
              { name: 'Bench Press', sets: 3, reps: '8-12', rest: '90s', note: 'Main horizontal press. Keep the setup stable and control the bar' },
              { name: 'Pec Dec Fly', sets: 3, reps: '10-15', rest: '75s', note: 'Controlled chest isolation through a comfortable range' },
              { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', note: 'Use manageable weight and avoid swinging' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-15', rest: '60s', note: 'Choose the attachment you are comfortable using and control every rep' },
              { name: 'Overhead Tricep Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Use a comfortable attachment and controlled range' }
            ]
          },

          2: {
            title: 'Tuesday — Pull + Abs',
            type: 'Pull + Abs',
            exercises: [
              { name: 'Lat Pulldown', sets: 3, reps: '8-12', rest: '90s', note: 'Pull smoothly toward the upper chest and control the stretch' },
              { name: 'Barbell Row', sets: 3, reps: '8-12', rest: '90s', note: 'Keep a stable hip-hinge position and control each rep' },
              { name: 'Low Row — Seated or Single Arm', sets: 3, reps: '8-12', rest: '75s', note: 'Use whichever variation is available and comfortable' },
              { name: 'Rear Delt Fly', sets: 2, reps: '12-15', rest: '60s', note: 'Light to moderate weight with controlled movement' },
              { name: 'Ez Bar Curl', sets: 3, reps: '10-12', rest: '60s', note: 'Controlled curls without swinging' },
              { name: 'Hammer Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the wrists neutral and control the lowering phase' },
              { name: 'Cable Crunch', sets: 2, reps: '10-15', rest: '45s', note: 'Curl the torso using the abs rather than pulling with the arms' },
              { name: 'Hanging Knee Raise', sets: 2, reps: '8-12', rest: '45s', note: 'Raise the knees under control and avoid excessive swinging' }
            ]
          },

          3: {
            title: 'Wednesday — Legs',
            type: 'Legs',
            exercises: [
              { name: 'Squat', sets: 3, reps: '6-10', rest: '2min', note: 'Use a manageable load and prioritize consistent technique' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', note: 'Controlled range without forcing depth' },
              { name: 'Leg Curl', sets: 3, reps: '10-15', rest: '75s', note: 'Control both directions and use a comfortable range' },
              { name: 'Leg Extension', sets: 2, reps: '10-15', rest: '60s', note: 'Controlled quad-focused work' }
            ]
          },

          4: {
            title: 'Thursday — Rest Day',
            type: 'Rest',
            exercises: [
              { name: 'Easy Walk', sets: 1, reps: '15-30 min', rest: '—', note: 'Optional light activity. Keep the intensity easy' },
              { name: 'Light Mobility', sets: 1, reps: '5-10 min', rest: '—', note: 'Optional comfortable mobility work' }
            ]
          },

          5: {
            title: 'Friday — Chest + Shoulders + Triceps',
            type: 'Push',
            exercises: [
              { name: 'Incline Machine Press', sets: 3, reps: '8-12', rest: '90s', note: 'Upper chest focused press with a controlled machine path' },
              { name: 'Shoulder Press', sets: 2, reps: '8-12', rest: '75s', note: 'Use a comfortable range and keep the torso stable' },
              { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '60s', note: 'Use the cable or another comfortable variation' },
              { name: 'Pec Dec Fly', sets: 2, reps: '10-15', rest: '75s', note: 'Controlled chest isolation with a comfortable range' },
              { name: 'Tricep Pushdown', sets: 2, reps: '10-15', rest: '60s', note: 'Use the attachment you are comfortable with and control the movement' },
              { name: 'Skull Crushers / Overhead Tricep Extension', sets: 2, reps: '10-12', rest: '60s', note: 'Choose the variation that feels comfortable and keep the movement controlled' }
            ]
          },

          6: {
            title: 'Saturday — Back + Biceps',
            type: 'Pull',
            exercises: [
              { name: 'Weighted Pull-ups', sets: 3, reps: '6-10', rest: '90s', note: 'Add weight only when bodyweight reps are strong and controlled' },
              { name: 'Lat Pulldown — Close Grip', sets: 2, reps: '8-12', rest: '75s', note: 'Control the stretch and pull smoothly' },
              { name: 'Lat Pulldown — Wide Grip', sets: 2, reps: '8-12', rest: '75s', note: 'Use a comfortable wide grip and avoid swinging' },
              { name: 'T-Bar Row', sets: 3, reps: '8-12', rest: '90s', note: 'Keep the torso stable and control the weight' },
              { name: 'Pullover', sets: 2, reps: '10-15', rest: '60s', note: 'Focus on controlled shoulder movement and lat tension' },
              { name: 'Rear Delt Fly', sets: 2, reps: '12-15', rest: '60s', note: 'Use light to moderate weight and controlled reps' },
              { name: 'Ez Bar Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Controlled curls without swinging' },
              { name: 'Hammer Curl', sets: 2, reps: '10-12', rest: '60s', note: 'Keep the wrists neutral and control the lowering phase' }
            ]
          },

          7: {
            title: 'Sunday — Rest Day',
            type: 'Rest',
            exercises: [
              { name: 'Rest / Easy Activity', sets: 1, reps: 'Optional', rest: '—', note: 'Prioritize recovery and normal daily activity' }
            ]
          }
        }
      }
    }
  }
};

export const FOOD_DATA = {
  veg: [
    // TIER 1 — Extremely High Protein
    { name: 'Soy Chunks', per: '100g', kcal: 345, protein: 52, carbs: 33, fat: 0.5, fiber: 0, tier: 1 },
    { name: 'Soybeans', per: '100g', kcal: 446, protein: 36, carbs: 30, fat: 20, fiber: 0, tier: 1 },
    { name: 'Tofu', per: '100g', kcal: 144, protein: 17, carbs: 3, fat: 9, fiber: 0, tier: 1 },
    { name: 'Tempeh', per: '100g', kcal: 193, protein: 20, carbs: 9, fat: 11, fiber: 0, tier: 1 },
    { name: 'Seitan', per: '100g', kcal: 143, protein: 25, carbs: 14, fat: 2, fiber: 0, tier: 1 },
    { name: 'Paneer Low Fat', per: '100g', kcal: 180, protein: 23, carbs: 3, fat: 11, fiber: 0, tier: 1 },
    { name: 'Paneer Regular', per: '100g', kcal: 265, protein: 18, carbs: 2, fat: 20, fiber: 0, tier: 1 },
    { name: 'Greek Yogurt', per: '100g', kcal: 59, protein: 10, carbs: 4, fat: 0.5, fiber: 0, tier: 1 },
    { name: 'Cheese', per: '100g', kcal: 402, protein: 25, carbs: 1, fat: 33, fiber: 0, tier: 1 },
    { name: 'Skim Milk Powder', per: '100g', kcal: 360, protein: 34, carbs: 52, fat: 1, fiber: 0, tier: 1 },

    // TIER 2 — High Protein Indian Staples
    { name: 'Moong Dal', per: '100g', kcal: 347, protein: 24, carbs: 63, fat: 1, fiber: 0, tier: 2 },
    { name: 'Toor Dal', per: '100g', kcal: 343, protein: 22, carbs: 63, fat: 2, fiber: 0, tier: 2 },
    { name: 'Masoor Dal', per: '100g', kcal: 352, protein: 25, carbs: 60, fat: 1, fiber: 0, tier: 2 },
    { name: 'Urad Dal', per: '100g', kcal: 341, protein: 25, carbs: 58, fat: 1.5, fiber: 0, tier: 2 },
    { name: 'Chana Dal', per: '100g', kcal: 364, protein: 21, carbs: 63, fat: 5, fiber: 0, tier: 2 },
    { name: 'Rajma', per: '100g', kcal: 333, protein: 24, carbs: 60, fat: 1, fiber: 0, tier: 2 },
    { name: 'Chickpeas', per: '100g', kcal: 364, protein: 19, carbs: 61, fat: 6, fiber: 0, tier: 2 },
    { name: 'Black Chana', per: '100g', kcal: 360, protein: 21, carbs: 60, fat: 5, fiber: 0, tier: 2 },
    { name: 'Green Peas', per: '100g', kcal: 81, protein: 5, carbs: 14, fat: 0.4, fiber: 0, tier: 2 },
    { name: 'Edamame', per: '100g', kcal: 121, protein: 11, carbs: 9, fat: 5, fiber: 0, tier: 2 },

    // TIER 3 — Nuts & Seeds
    { name: 'Peanuts', per: '100g', kcal: 567, protein: 26, carbs: 16, fat: 49, fiber: 0, tier: 3 },
    { name: 'Almonds', per: '100g', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 0, tier: 3 },
    { name: 'Pistachios', per: '100g', kcal: 562, protein: 20, carbs: 28, fat: 45, fiber: 0, tier: 3 },
    { name: 'Cashews', per: '100g', kcal: 553, protein: 18, carbs: 30, fat: 44, fiber: 0, tier: 3 },
    { name: 'Walnuts', per: '100g', kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 0, tier: 3 },
    { name: 'Pumpkin Seeds', per: '100g', kcal: 559, protein: 30, carbs: 11, fat: 49, fiber: 0, tier: 3 },
    { name: 'Sunflower Seeds', per: '100g', kcal: 584, protein: 21, carbs: 20, fat: 51, fiber: 0, tier: 3 },
    { name: 'Chia Seeds', per: '100g', kcal: 486, protein: 17, carbs: 42, fat: 31, fiber: 0, tier: 3 },
    { name: 'Flax Seeds', per: '100g', kcal: 534, protein: 18, carbs: 29, fat: 42, fiber: 0, tier: 3 },
    { name: 'Sesame Seeds', per: '100g', kcal: 573, protein: 18, carbs: 23, fat: 50, fiber: 0, tier: 3 },

    // TIER 4 — Dairy & Everyday Foods
    { name: 'Milk', per: '100g', kcal: 61, protein: 3.4, carbs: 5, fat: 3.5, fiber: 0, tier: 4 },
    { name: 'Curd', per: '100g', kcal: 60, protein: 3.5, carbs: 4, fat: 3, fiber: 0, tier: 4 },
    { name: 'Buttermilk', per: '100g', kcal: 40, protein: 3, carbs: 4, fat: 1, fiber: 0, tier: 4 },
    { name: 'Whey Protein', per: '100g', kcal: 400, protein: 78, carbs: 8, fat: 5, fiber: 0, tier: 4 },
    { name: 'Oats', per: '100g', kcal: 389, protein: 13, carbs: 68, fat: 7, fiber: 0, tier: 4 },
    { name: 'Quinoa', per: '100g', kcal: 368, protein: 14, carbs: 64, fat: 6, fiber: 0, tier: 4 },
    { name: 'Brown Rice', per: '100g', kcal: 370, protein: 7, carbs: 77, fat: 2, fiber: 0, tier: 4 },
    { name: 'White Rice', per: '100g', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0, tier: 4 },
    { name: 'Wheat Flour', per: '100g', kcal: 340, protein: 13, carbs: 72, fat: 2, fiber: 0, tier: 4 },
    { name: 'Whole Wheat Bread', per: '100g', kcal: 247, protein: 12, carbs: 43, fat: 4, fiber: 0, tier: 4 },

    // TIER 5 — Other Good Sources
    { name: 'Corn', per: '100g', kcal: 86, protein: 3, carbs: 19, fat: 1, fiber: 0, tier: 5 },
    { name: 'Broccoli', per: '100g', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 0, tier: 5 },
    { name: 'Spinach', per: '100g', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 0, tier: 5 },
    { name: 'Mushrooms', per: '100g', kcal: 22, protein: 3.1, carbs: 3, fat: 0.3, fiber: 0, tier: 5 },
    { name: 'Sweet Corn', per: '100g', kcal: 96, protein: 3.4, carbs: 21, fat: 1.5, fiber: 0, tier: 5 },
    { name: 'Sweet Potato', per: '100g', kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 0, tier: 5 },
    { name: 'Avocado', per: '100g', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 0, tier: 5 },
    { name: 'Coconut', per: '100g', kcal: 354, protein: 3, carbs: 15, fat: 33, fiber: 0, tier: 5 },
    { name: 'Banana', per: '100g', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 0, tier: 5 },
    { name: 'Nendran Banana', per: '100g', kcal: 120, protein: 1.3, carbs: 31, fat: 0.2, fiber: 0, tier: 5 }
  ],

  nonveg: [
    // TIER 1 — Extremely High Protein
    { name: 'Chicken Breast', per: '100g', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, tier: 1 },
    { name: 'Turkey Breast', per: '100g', kcal: 135, protein: 29, carbs: 0, fat: 2, fiber: 0, tier: 1 },
    { name: 'Tuna', per: '100g', kcal: 130, protein: 29, carbs: 0, fat: 1, fiber: 0, tier: 1 },
    { name: 'Salmon', per: '100g', kcal: 208, protein: 25, carbs: 0, fat: 13, fiber: 0, tier: 1 },
    { name: 'Sardines', per: '100g', kcal: 208, protein: 25, carbs: 0, fat: 11, fiber: 0, tier: 1 },
    { name: 'Mackerel', per: '100g', kcal: 205, protein: 24, carbs: 0, fat: 13, fiber: 0, tier: 1 },
    { name: 'Seer Fish', per: '100g', kcal: 134, protein: 23, carbs: 0, fat: 5, fiber: 0, tier: 1 },
    { name: 'Rohu Fish', per: '100g', kcal: 140, protein: 17, carbs: 0, fat: 7, fiber: 0, tier: 1 },
    { name: 'Tilapia', per: '100g', kcal: 128, protein: 26, carbs: 0, fat: 3, fiber: 0, tier: 1 },
    { name: 'Prawns', per: '100g', kcal: 99, protein: 24, carbs: 0, fat: 0.5, fiber: 0, tier: 1 },
    { name: 'Crab', per: '100g', kcal: 97, protein: 19, carbs: 0, fat: 1.5, fiber: 0, tier: 1 },
    { name: 'Lobster', per: '100g', kcal: 89, protein: 19, carbs: 1, fat: 1, fiber: 0, tier: 1 },
    { name: 'Lean Beef', per: '100g', kcal: 217, protein: 27, carbs: 0, fat: 10, fiber: 0, tier: 1 },
    { name: 'Lean Mutton', per: '100g', kcal: 258, protein: 25, carbs: 0, fat: 16, fiber: 0, tier: 1 },
    { name: 'Pork Loin', per: '100g', kcal: 242, protein: 27, carbs: 0, fat: 14, fiber: 0, tier: 1 },
    { name: 'Duck Breast', per: '100g', kcal: 195, protein: 28, carbs: 0, fat: 7, fiber: 0, tier: 1 },
    { name: 'Chicken Liver', per: '100g', kcal: 167, protein: 24, carbs: 1, fat: 6, fiber: 0, tier: 1 },
    { name: 'Goat Liver', per: '100g', kcal: 135, protein: 20, carbs: 4, fat: 3, fiber: 0, tier: 1 },
    { name: 'Egg Whites', per: '100g', kcal: 52, protein: 11, carbs: 1, fat: 0, fiber: 0, tier: 1 },
    { name: 'Whole Eggs', per: '100g', kcal: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, tier: 1 },

    // TIER 2 — High Protein
    { name: 'Chicken Legs', per: '100g', kcal: 190, protein: 27, carbs: 0, fat: 8, fiber: 0, tier: 2 },
    { name: 'Chicken Thighs', per: '100g', kcal: 209, protein: 26, carbs: 0, fat: 10, fiber: 0, tier: 2 },
    { name: 'Canned Tuna', per: '100g', kcal: 116, protein: 26, carbs: 0, fat: 1, fiber: 0, tier: 2 },
    { name: 'Anchovies', per: '100g', kcal: 210, protein: 29, carbs: 0, fat: 10, fiber: 0, tier: 2 },
    { name: 'Catla Fish', per: '100g', kcal: 122, protein: 18, carbs: 0, fat: 4, fiber: 0, tier: 2 },
    { name: 'Pomfret', per: '100g', kcal: 140, protein: 20, carbs: 0, fat: 6, fiber: 0, tier: 2 },
    { name: 'Hilsa Fish', per: '100g', kcal: 240, protein: 22, carbs: 0, fat: 14, fiber: 0, tier: 2 },
    { name: 'Squid', per: '100g', kcal: 92, protein: 16, carbs: 3, fat: 1, fiber: 0, tier: 2 },
    { name: 'Octopus', per: '100g', kcal: 82, protein: 15, carbs: 4, fat: 1, fiber: 0, tier: 2 },
    { name: 'Mussels', per: '100g', kcal: 172, protein: 24, carbs: 7, fat: 4, fiber: 0, tier: 2 },
    { name: 'Oysters', per: '100g', kcal: 81, protein: 9, carbs: 5, fat: 2, fiber: 0, tier: 2 },
    { name: 'Clams', per: '100g', kcal: 86, protein: 15, carbs: 5, fat: 2, fiber: 0, tier: 2 },
    { name: 'Goat Meat', per: '100g', kcal: 143, protein: 27, carbs: 0, fat: 3, fiber: 0, tier: 2 },
    { name: 'Lamb Chops', per: '100g', kcal: 294, protein: 25, carbs: 0, fat: 21, fiber: 0, tier: 2 },
    { name: 'Minced Chicken', per: '100g', kcal: 180, protein: 27, carbs: 0, fat: 8, fiber: 0, tier: 2 },
    { name: 'Minced Turkey', per: '100g', kcal: 170, protein: 26, carbs: 0, fat: 7, fiber: 0, tier: 2 },
    { name: 'Fish Curry', per: '100g', kcal: 160, protein: 18, carbs: 4, fat: 8, fiber: 0, tier: 2 },
    { name: 'Boiled Eggs', per: '100g', kcal: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, tier: 2 },
    { name: 'Omelette', per: '100g', kcal: 170, protein: 11, carbs: 2, fat: 12, fiber: 0, tier: 2 },

    // TIER 3 — Moderate Protein
    { name: 'Chicken Sausages', per: '100g', kcal: 220, protein: 17, carbs: 5, fat: 15, fiber: 0, tier: 3 },
    { name: 'Fish Fingers', per: '100g', kcal: 190, protein: 13, carbs: 18, fat: 8, fiber: 0, tier: 3 },
    { name: 'Chicken Kebab', per: '100g', kcal: 190, protein: 22, carbs: 3, fat: 10, fiber: 0, tier: 3 },
    { name: 'Tandoori Chicken', per: '100g', kcal: 210, protein: 27, carbs: 2, fat: 8, fiber: 0, tier: 3 },
    { name: 'Bone Broth', per: '100g', kcal: 60, protein: 8, carbs: 1, fat: 3, fiber: 0, tier: 3 },
    { name: 'Chicken Soup', per: '100g', kcal: 85, protein: 10, carbs: 3, fat: 4, fiber: 0, tier: 3 },
    { name: 'Fish Cutlet', per: '100g', kcal: 210, protein: 14, carbs: 15, fat: 10, fiber: 0, tier: 3 },
    { name: 'Dry Fish', per: '100g', kcal: 290, protein: 50, carbs: 0, fat: 4, fiber: 0, tier: 3 },
    { name: 'Beef Jerky', per: '100g', kcal: 180, protein: 33, carbs: 11, fat: 2, fiber: 0, tier: 3 },
    { name: 'Egg Bhurji', per: '100g', kcal: 180, protein: 12, carbs: 3, fat: 13, fiber: 0, tier: 3 }
  ]
};

