const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



//connect to the DB
const db = new sqlite3.Database('./albayat.db', sqlite3.OPEN_READWRITE,
        (err) => {
                if (err) return console.log(err.message);
                else console.log('connected to the SQLlite database');
        });
db.get("PRAGMA foreign_keys = ON")

let sql;


sql = `CREATE TABLE IF NOT EXISTS users(
	user_id	 INTEGER	   PRIMARY KEY AUTOINCREMENT,
  	email     TEXT  NOT NULL    UNIQUE,
    username TEXT  NOT NULL    UNIQUE,
    password  TEXT   NOT NULL,
    rule      TEXT,
    gender    TEXT   NOT NULL,
    height    INTEGER    NOT NULL,
    birth_date TEXT    NOT NULL,
    weight    INTEGER    NOT NULL,
    target_weight INTEGER NOT NULL
)`;

db.run(sql);


sql = `CREATE TABLE IF NOT EXISTS plan(
	plan_id	 INTEGER	   PRIMARY KEY AUTOINCREMENT,
  	user_id     INTEGER  NOT NULL    UNIQUE,
    name TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)`;

db.run(sql);


//---------------------print table names---------------------------
// db.serialize(function () {
//     db.all("select name from sqlite_master where type='table'", function (err, tables) {
//         console.log(tables);
//     });
// });

sql = `CREATE TABLE IF NOT EXISTS exercices(
        exercise_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        img TEXT NOT NULL,
        url TEXT NOT NULL,
        muscle TEXT NOT NULL)`;
    db.run(sql);
    
    
    let exercice1 = [1, 'dips', `
    Step 1: Grasp the parallel bars and hop up so your arms are straight. Lean forward at about a 45-degree angle, bend at the waist, so your legs are vertical, and pull your toes up toward your shins. Pull your shoulders down and back. Maintain this body position throughout the exercise.\n
    Step 2: Slowly bend your elbows to lower your body into the Dip until your upper arms are about parallel to the ground. Keep your elbows tight to your body.\n
    Step 3: Straighten your arms to drive your body up to the starting position.`,
        'dips.png',
        'https://youtu.be/dX_nSOOJIsE'
        , 'chest'];
    
    let exercice2 = [2, 'Incline bench press', `Step 1: Unrack the weighted bar and slowly lower it to your chest.\n
    Step 2: Touch the bar to your chest, then lift the bar by extending your arms. Avoid locking out to maintain tension on your chest muscles.\n
    Step 3: Repeat for desired repetitions before re-racking.`
        , 'incline-bench-press.png'
        , 'https://youtu.be/DbFgADa2PL8'
        , 'chest'];
    
    let exercice3 = [3, 'Flat bench press', `Step 1: Lie on a flat bench with your feet flat on the floor and your knees bent. Grasp the bar with a shoulder-width grip and lift it off the rack.\n
    Step 2: Lower the bar to your chest by bending your elbows. Pause, then push the bar back to the starting position.\n
    Step 3: Repeat for desired repetitions before re-racking.`
        , 'flat-bench-press.png'
        , 'https://youtu.be/ZOwwBk642SI'
        , 'chest'];
    
    let exercice4 = [4, 'Cable chest fly', `Step 1: Attach a rope handle to a low pulley and stand with your feet shoulder-width apart. Grasp the rope with an overhand grip and hold it at shoulder height with your elbows slightly bent.\n
    Step 2: Keeping your elbows close to your body, pull the rope down and out to the sides until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'cable-chest-fly.png'
        , 'https://youtu.be/TR4FdOs_7PY'
        , 'chest'];
    
    let exercice5 = [5, 'Decline bench press', `Step 1: Lie on a decline bench with your feet flat on the floor and your knees bent. Grasp the bar with a shoulder-width grip and lift it off the rack.\n
    Step 2: Lower the bar to your chest by bending your elbows. Pause, then push the bar back to the starting position.\n
    Step 3: Repeat for desired repetitions before re-racking.`
        , 'decline-bench-press.png'
        , 'https://youtu.be/NM5lbuq92Aw'
        , 'chest'];
    
    let exercice6 = [6, 'Dumbbell pull over', `Step 1: Lie on a flat bench with a dumbbell in each hand. Grasp the dumbbells with an overhand grip and extend your arms above your chest.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells down and out to the sides until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'dumbbell-pullover.png'
        , 'https://youtu.be/zUVzVXMh9Nc'
        , 'chest'];
    
    let exercice7 = [7, 'Skull crusher', `Step 1: Lie on a flat bench with a dumbbell in each hand. Grasp the dumbbells with an overhand grip and extend your arms above your chest.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells down and out to the sides until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'skullcrusher.png'
        , 'https://youtu.be/BdqzYZmL2Bc'
        , 'triceps'];
    
    let exercice8 = [8, 'Bench dip', `Step 1: Grasp the parallel bars and hop up so your arms are straight. Lean forward at about a 45-degree angle, bend at the waist, so your legs are vertical, and pull your toes up toward your shins. Pull your shoulders down and back. Maintain this body position throughout the exercise.\n
    Step 2: Slowly bend your elbows to lower your body into the Dip until your upper arms are about parallel to the ground. Keep your elbows tight to your body.\n
    Step 3: Straighten your arms to drive your body up to the starting position.`
        , 'bench-dip.png'
        , 'https://youtu.be/lPXJMzFXFvc'
        , 'triceps'];
    
    let exercice9 = [9, 'Cable triceps pushdown', `Step 1: Attach a rope handle to a low pulley and stand with your feet shoulder-width apart. Grasp the rope with an overhand grip and hold it at shoulder height with your elbows slightly bent.\n
    Step 2: Keeping your elbows close to your body, pull the rope down and out to the sides until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions`
        , 'cable-triceps-pushdown.png'
        , 'https://youtu.be/2-LAMcpzODU?t=14'
        , 'triceps'];
    
    let exercice10 = [10, 'Overhead extension', `Step 1: Stand with your feet shoulder-width apart and hold a dumbbell in each hand with your arms at your sides. Grasp the dumbbells with an overhand grip and extend your arms above your head.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells down and out to the sides until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'overhead-extension.png'
        , 'https://youtu.be/_gsUck-7M74'
        , 'triceps'];
    
    let exercice11 = [11, 'Diamond pushup', `Step 1: Get into a pushup position with your hands together, forming a diamond shape. Your hands should be slightly wider than shoulder-width apart.\n
    Step 2: Bend your elbows and lower your body until your chest nearly touches the floor. Pause, then push yourself back to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'diamond-push-ups.png'
        , 'https://youtu.be/pD3mD6WgykM'
        , 'triceps'];
    
    let exercice12 = [12, 'Triceps machine dip', `Step 1: Sit on the machine and grasp the handles. Position your feet on the footrests and adjust the seat so your arms are fully extended.\n
    Step 2: Slowly bend your elbows to lower your body into the Dip until your upper arms are about parallel to the ground. Keep your elbows tight to your body.\n
    Step 3: Straighten your arms to drive your body up to the starting position.`
        , 'triceps-machine-dip.png'
        , 'https://youtu.be/Uv6poyDWsUo'
        , 'triceps'];
    
    let exercice13 = [13, 'Dumbbell curls', `Step 1: Stand with your feet shoulder-width apart and hold a dumbbell in each hand with your arms at your sides. Grasp the dumbbells with an overhand grip and extend your arms down to your sides.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells up until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'dumbbell-curl.png'
        , 'https://youtu.be/ykJmrZ5v0Oo'
        , 'biceps'];
    
    let exercice14 = [14, 'Hammer curl', `Step 1: Stand with your feet shoulder-width apart and hold a dumbbell in each hand with your arms at your sides. Grasp the dumbbells with an overhand grip and extend your arms down to your sides.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells up until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'hammer-curl.png'
        , 'https://youtu.be/TwD-YGVP4Bk'
        , 'biceps'];
    
    let exercice15 = [15, 'Chin ups', `Step 1: Grab the bar with an overhand grip, slightly wider than shoulder-width apart. Your palms should be facing away from you.\n
    Step 2: Pull your body up until your chin is over the bar. Pause, then slowly lower yourself back to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'chin-ups.png'
        , 'https://youtu.be/b-ztMQpj8yc'
        , 'biceps'];
    
    let exercice16 = [16, 'Concentration curl', `Step 1: Sit on a bench with a dumbbell in each hand. Grasp the dumbbells with an overhand grip and extend your arms down to your sides.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells up until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'concentration-curl.png'
        , 'https://youtu.be/0AUGkch3tzc'
        , 'biceps'];
    
    let exercice17 = [17, 'Spider curl', `Step 1: Stand with your feet shoulder-width apart and hold a dumbbell in each hand with your arms at your sides. Grasp the dumbbells with an overhand grip and extend your arms down to your sides.\n
    Step 2: Keeping your elbows close to your body, pull the dumbbells up until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'spider-curl.png'
        , 'https://youtu.be/nvufDW-MSQk'
        , 'biceps'];
    
    let exercice18 = [18, 'Cable hammer curl', `Step 1: Attach a rope handle to a low pulley and stand with your feet shoulder-width apart. Grasp the rope with an overhand grip and hold it at shoulder height with your elbows slightly bent.\n
    Step 2: Keeping your elbows close to your body, pull the rope up until your arms are fully extended. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'cable-hammer-curl.png'
        , 'https://youtu.be/vsarApmqJmo'
        , 'biceps'];
    
    let exercice19 = [19, 'Set ups', `Step 1: Lie on your back with your knees bent and your feet flat on the floor. Place your hands behind your head with your elbows pointing out.\n
    Step 2: Lift your shoulders off the floor and curl your upper body forward until your head is just above the floor. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'set-ups.png'
        , 'https://youtu.be/jDwoBqPH0jk'
        , 'abs'];
    
    let exercice20 = [20, 'Russian twist', `Step 1: Sit on the floor with your knees bent and your feet flat on the floor. Hold a dumbbell in each hand with your arms extended in front of you. Lean back slightly and place your hands behind your head with your elbows pointing out.\n
    Step 2: Lift your shoulders off the floor and curl your upper body forward until your head is just above the floor. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'russian-twist.png'
        , 'https://youtu.be/wkD8rjkodUI'
        , 'abs'];
    
    let exercice21 = [21, 'Reverse crunch', `Step 1: Lie on your back with your knees bent and your feet flat on the floor. Place your hands behind your head with your elbows pointing out.\n
    Step 2: Lift your shoulders off the floor and curl your upper body forward until your head is just above the floor. Pause, then slowly return to the starting position.\n
    Step 3: Repeat for desired repetitions.`
        , 'reverse-crunch.png'
        , 'https://youtu.be/7rRWy7-Gokg'
        , 'abs'];
    
    let exercice22 = [22, 'Leg raise', `Step 1: Lie on your back, legs straight and together.\n
    Step 2: Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor.\n
    Step 3: Slowly lower your legs back down till they’re just above the floor. Hold for a moment.\n
    Step 4: Raise your legs back up. Repeat.`
        , 'leg-raise.png'
        , 'https://youtu.be/1w8ZgX8Yq0o'
        , 'abs'];
    
    let exercice23 = [23, 'Plank',
        `Step 1: Assume a push-up position but bend your arms at your elbows so your weight rests on your forearms.\n
    Step 2: Tighten your abs, clench your glutes and keep your body straight from head to heels.\n
    Step 3: Hold as long as you can. `
        , 'plan.png'
        , 'https://youtu.be/kL_NJAkCQBg'
        , 'abs'];
    
    let exercice24 = [24, 'Mountain Climber',
        `Step 1: Start in a push-up position with your hands on the floor and your body straight from head to heels.\n
    Step 2: Bring your right knee toward your chest, then return to the starting position.\n
    Step 3: Bring your left knee toward your chest, then return to the starting position.\n
    Step 4: Continue alternating legs. `
        , 'mountain-climber.png'
        , 'https://youtu.be/5j3w0nMs8V4'
        , 'abs'];
    
    let exercice25 = [25, 'Back Squat',
        `Step 1: Stand with your feet shoulder-width apart and your toes pointed slightly outward.\n
    Step 2: Hold a barbell across the upper back with your hands shoulder-width apart.\n
    Step 3: Bend your knees and hips and lower your body until your thighs are parallel to the floor.\n
    Step 4: Pause, then push through your heels to return to the starting position. `
        , 'back-squat.png'
        , 'https://youtu.be/MVMNk0HiTMg'
        , 'legs'];
    
    
    let exercice26 = [26, 'Front Squat',
        `Step 1: Stand with your feet shoulder-width apart and your toes pointed slightly outward.\n
    Step 2: Hold a barbell across the upper back with your hands shoulder-width apart.\n
    Step 3: Bend your knees and hips and lower your body until your thighs are parallel to the floor.\n
    Step 4: Pause, then push through your heels to return to the starting position. `
        , 'front-squat.png'
        , 'https://youtu.be/U7Y-bY4bZj0'
        , 'legs'];
    
    let exercice27 = [27, 'Romanian Deadlift',
        `Step 1: Stand with your feet shoulder-width apart and your toes pointed slightly outward.\n
    Step 2: Hold a barbell across the upper back with your hands shoulder-width apart.\n
    Step 3: Bend your knees and hips and lower your body until your thighs are parallel to the floor.\n
    Step 4: Pause, then push through your heels to return to the starting position. `
        , 'romanian-deadlift.png'
        , 'https://youtu.be/3VXmecChYYM'
        , 'legs'];
    
    let exercice28 = [28, 'Walking Lunges',
        `Step 1: Stand up straight with your feet shoulder-width apart. Your hands can stay by the side of your body or on your hips.\n
    Step 2: Step forward with your right leg, putting the weight into your heel.\n
    Step 3: Bend the right knee, lowering down so that it’s parallel to the floor in a lunge position. Pause for a beat.\n
    Step 4: Without moving the right leg, move your left foot forward, repeating the same movement on the left leg. Pause as your left leg is parallel to the floor in a lunge position.\n
    Step 5: Repeat this movement, “walking” forward as you lunge, alternating legs.`
        , 'walking-lunges.png'
        , 'https://youtu.be/COKYKgQ8KR0'
        , 'legs'];
    
    let exercice29 = [29, 'Standing Calf Raise',
        `Step 1: Stand up straight with your feet shoulder-width apart. Your hands can stay by the side of your body or on your hips.\n
    Step 2: Step forward with your right leg, putting the weight into your heel.\n
    Step 3: Bend the right knee, lowering down so that it’s parallel to the floor in a lunge position. Pause for a beat.\n
    Step 4: Without moving the right leg, move your left foot forward, repeating the same movement on the left leg. Pause as your left leg is parallel to the floor in a lunge position.`
        , 'standing-calf-raise.png'
        , 'https://youtu.be/GAQ-oohMhog'
        , 'legs'];
    
    let exercice30 = [30, 'Side Lunge',
        `Step 1: Stand straight with your feet hip-width apart.\n
    Step 2: Step out to the side and transfer your weight to that leg.\n
    Step 3: Use your lead foot to push you back to the starting position.\n
    Step 4: Repeat and then switch sides.`
        , 'side-lunge.png'
        , 'https://youtu.be/Jky9kOx0L84'
        , 'legs'];
    
    let exercice31 = [31, 'Barbell Deadlift',
        `Step 1: Stand with your mid-foot under the barbell.\n
    Step 2: Bend over and grab the bar with a shoulder-width grip.\n
    Step 3: Bend your knees until your shins touch the bar.\n
    Step 4: Lift your chest up and straighten your lower back.\n
    Step 5: Take a big breath, hold it, and stand up with the weight.`
        , 'barbell-deadlift.png'
        , 'https://youtu.be/r4MzxtBKyNE'
        , 'back'];
    
    let exercice32 = [32, 'Pull Ups',
        `Step 1: Exhale while pulling yourself up so your chin is level with the bar. Pause at the top.\n
    Step 2: Lower yourself (inhaling as you go down) until your elbows are straight.\n
    Step 3: Repeat the movement without touching the floor.\n
    Step 4: Complete the number of repetitions your workout requires`
        , 'pull-ups.png'
        , 'https://youtu.be/UgKaDSA3uIg'
        , 'back'];
    
    let exercice33 = [33, 'Back Rows',
        `Step 1: Stand with your mid-foot under the bar (medium stance)\n
    Step 2: Bend over and grab the bar (palms down, medium-grip)\n
    Step 3: Unlock your knees while keeping your hips high\n
    Step 4: Lift your chest and straighten your back\n
    Step 5: Pull the bar against your lower chest`
        , 'back-rows.png'
        , 'https://youtu.be/B1T6ZYrPAy4'
        , 'back'];
    
    let exercice34 = [34, 'Dumbbell Row',
        `Step 1: Pull the dumbbells up, toward the sides of your chest, or beside the bottom of your rib cage on an exhale.
     Lift to the point your range of motion allows. While lifting, keep the wrists from moving as much as possible.\n
     Step 2: Lower the weights in a controlled manner to the starting position as you inhale. Remain bent over until all repetitions are complete. `
        , 'dumbbell-row.png'
        , 'https://youtu.be/-koP10y1qZI'
        , 'back'];
    
    let exercice35 = [35, 'Lat Pulldown',
        `Step 1: Grasp the bar with a wide grip with an overhand, knuckles-up grip. Other positions and grips are possible but start with this standard position.\n
    Step 2: Pull the bar down until it's approximately level with the chin. Exhale on the downward motion. While shifting slightly backward is OK, aim to keep your upper torso stationary. Keep your feet flat on the floor and engage your abs as you pull. The bottom of the motion should be where your elbows can't move downward anymore without moving backward. Be sure to stop at that point and do not go lower.\n
    Step 3: Squeeze the shoulder blades together while maintaining square shoulders.\n
    Step 4: From the bottom position, with the bar close to your chin, slowly return the bar to the starting position while controlling its gradual ascent. Don't let it crash into the weight plates.`
        , 'lat-pulldown.png'
        , 'https://youtu.be/u3gQT2aMVaI'
        , 'back'];
    
    let exercice36 = [36, 'Seated Cable Row',
        `Step 1: Pull the handle and weight back toward the lower abdomen while trying not to use the momentum of the row too much by moving the torso backward with the arms.\n
    Step 2: Target the middle to upper back by keeping your back straight and squeezing your shoulder blades together as you row, keeping your chest out.\n
    Step 3: Return the handle forward under tension to full stretch, remembering to keep that back straight even though flexed at the hips. Repeat the exercise for the desired number of repetitions.`
        , 'seated-cable-row.png'
        , 'https://youtu.be/sP_4vybjVJs'
        , 'back'];
    
    let exercice37 = [37, 'Dumbbell Wrist Flexion',
        `Step 1: Grab a dumbbell with an overhand grip and rest your forearm against your thigh, or alternatively against a bench.\n
    Step 2: Lower your hand towards the floor.\n
    Step 3: Reverse the motion by bending your wrist upwards.`
        , 'dumbbell-wrist-flexion.png'
        , 'https://youtu.be/u61QWKYgbxI'
        , 'forearms'];
    
    let exercice38 = [38, 'Inverted Row',
        `Step 1: Set the bar (or your rings) around waist height. The lower the bar, the more difficult the movement becomes.\n
    Step 2: Position yourself under the bar lying face up. Lie on the floor underneath the bar (which should be set just above where you can reach from the ground).\n
    Step 3: Grab the bar with an overhand grip, slightly wider than shoulder-width (palms facing AWAY from you).\n
    Step 4: Contract your abs and butt, and keep your body a completely straight line. Your ears, shoulders, hips legs, and feet should all be in a straight line (like you’re doing a plank).\n
    Step 5: Pull yourself up to the bar until your chest touches the bar.\n
    Step 6: Lower yourself back down with proper form.`
        , 'inverted-row.png'
        , 'https://youtu.be/hXTc1mDnZCw'
        , 'forearms'];
    
    let exercice39 = [39, 'Dumbbell Wrist Extension',
        `Step 1: Grab a dumbbell with an overhand grip and rest your forearm against your thigh, or alternatively against a bench.\n
    Step 2: Lower your hand towards the floor.\n
    Step 3: Reverse the motion by bending your wrist upwards.`
        , 'dumbbell-wrist-extension.png'
        , 'https://youtu.be/la-0c4ubkvs'
        , 'forearms'];
    
    let exercice40 = [40, 'Pullup Bar Hand',
        `Step 1: Start with your hands on the bar approximately shoulder-width apart with your palms facing forward.\n
    Step 2: With arms extended above you, stick your chest out and curve your back slightly. That is your starting position.\n
    Step 3: Pull yourself up towards the bar using your back until the bar is at chest level while breathing out.\n
    Step 4: Slowly lower yourself to the starting position while breathing in. That is one rep.`
        , 'pullup-bar-hand.png'
        , 'https://youtu.be/s7c3ioCyazs'
        , 'forearms'];
    
    
    let exercice41 = [41, 'Upright Dumbbell Row',
        `Step 1: Start by standing with your feet shoulder-width apart and your knees slightly bent.\n
    Step 2: Hold a dumbbell in each hand, letting them hang at arm’s length by your sides.\n
    Step 3: Keeping your back straight and your core engaged, lift the dumbbells straight up, along your body, until they are chest high.\n
    Step 4: Squeeze your shoulder blades together at the top of the move, then slowly lower the dumbbells back to the starting position.`
        , 'upright-dumbbell-row.png'
        , 'https://youtu.be/JQRNR4oc1mw'
        , 'forearms'];
    
    let exercice42 = [42, 'Zottman Curl',
        `Step 1: Select the desired weight from the rack and assume a shoulder width stance.\n
    Step 2: Using a supinated grip, take a deep breath and curl the dumbbells towards your shoulders.\n
    Step 3: Once the biceps are fully shortened, rotate the forearms to a pronated position (palms down) and slowly lower the weight back to the starting position.\n
    Step 4: Repeat for the desired number of repetitions.`
        , 'zottman-curl.png'
        , 'https://youtu.be/ZrpRBgswtHs'
        , 'forearms'];
    
    let exercice43 = [43, 'Dumbbell Front Raise',
        `Step 1: Grab two dumbbells and stand up straight. The dumbbells should be in front of your thighs with your hands facing down. This is the starting position.\n
    Step 2: While keeping your torso stationary, lift the dumbbells to the front. Your elbows should be slightly bent.
    Lift the dumbbells up until your arms are slightly above the level where they would be parallel to the floor.
    Exhale as you do so, and pause for a second when you get to the top.\n
    Step 3: Lower the dumbbells back to the starting position, inhaling as you do so.\n
    Step 4: Repeat for the desired number of reps.`
        , 'dumbbell-front-raise.png'
        , 'https://youtu.be/-t7fuZ0KhDA'
        , 'shoulder'];
    
    let exercice44 = [44, 'Dumbbell Lateral Raise',
        `Step 1: Grab a set of dumbbells and stand straight.\n
    Step 2: With your palms facing down, lift the dumbbells and raise your arms out to the sides.
    Step 3: Once your elbows are at shoulder height, pause, and then slowly lower the arms back to the initial position.\n`
        , 'dumbbell-lateral-raise.png'
        , 'https://youtu.be/3VcKaXpzqRo'
        , 'shoulder'];
    
    let exercice45 = [45, 'Face Pull',
        `Step 1: Assume a split stance with the arms straight out in front of you utilizing a pronated grip.\n
    Step 2: Inhale and pull the rope towards your face with the elbows high.\n
    Step 3: Slowly lower the rope back to the starting position and repeat for the desired number of repetitions on both sides.`
        , 'face-pull.png'
        , 'https://youtu.be/V8dZ3pyiCBo'
        , 'shoulder'];
    
    
    let exercice46 = [46, 'Renegada row',
        `Step 1: Keeping your hips and shoulders square, exhale as you pull one dumbbell up to the side of your waist.\n
    Step 2: Hold for a count of two and squeeze your back muscles.\n
    Step 3: Inhale as you return to the starting position by slowly lowering the dumbbell to the floor.\n
    Step 4: Repeat the lift with your opposite arm.\n
    Step 5: Alternating your arms, perform the desired number of repetitions.`
        , 'renegada-row.png'
        , 'https://youtu.be/wTqlJ0aoJlM'
        , 'shoulder'];
    
    let exercice47 = [47, 'Reverse Fly',
        `Step 1: Raise both arms out to your side on an exhale.
    Keep a soft bend in your elbows. Squeeze the shoulder blades together as you pull them toward the spine.\n
    Step 2: Lower the weight back to the start position as you inhale. Avoid hunching your
    shoulders, and keep your chin tucked to maintain a neutral spine during the exercise.`
        , 'reverse-fly.png'
        , 'https://youtu.be/9R5f4oIjwq8'
        , 'shoulder'];
    let exercice48 = [48, 'Shoulder Press',
        `Step 1: Stand with your feet shoulder-width apart and hold a dumbbell in each hand.
    Step 2: With your palms facing forward and your elbows under your wrists, position the dumbbells at your shoulders.\n
    Step 3: Push the dumbbells up and fully extend your arms.\n
    Step 4: Lower the dumbbells back down to your shoulders and repeat the movement until the set is complete.`
        , 'shoulder-press.png'
        , 'https://youtu.be/Z5g48LuHB9s'
        , 'shoulder'];
    
    //put all exercices in an array
//     let exercises = [exercice1, exercice2, exercice3, exercice4, exercice5, exercice6,
//         exercice7, exercice8, exercice9, exercice10, exercice11, exercice12,
//         exercice13, exercice14, exercice15, exercice16, exercice17, exercice18,
//         exercice19, exercice20, exercice21, exercice22, exercice23, exercice24,
//         exercice25, exercice26, exercice27, exercice28, exercice29, exercice30,
//         exercice31, exercice32, exercice33, exercice34, exercice35, exercice36,
//         exercice37, exercice38, exercice39, exercice40, exercice41, exercice42,
//         exercice43, exercice44, exercice45, exercice46, exercice47, exercice48];
//     //insert all exercices in the database
//     for (let i = 0; i < exercises.length; i++) {
//         db.run(`INSERT INTO exercices VALUES(?,?,?,?,?,?)`, exercises[i], function (err) {
//             if (err) {
//                 return console.log(err.message);
//             }
//             // get the last insert id
//             console.log(`A row has been inserted with rowid ${this.lastID}`);
//         });
//     }


sql = `SELECT * FROM exercices`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});


