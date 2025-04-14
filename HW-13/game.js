const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  let player;
  let cursors;
  let spaceKey;
  let stars;
  let spikes;
  let platforms;
  let score = 0;
  let scoreText;
  let gameOver = false;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('star', 'images/star.png');
    this.load.image('spike', 'images/spike.png');
    this.load.image('player', 'images/player.png'); // Make sure this exists!
  }
  
  function create() {
    // background
    this.add.image(400, 300, 'sky');
  
    // platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
  
    // player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    // input
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
    // stars
    stars = this.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: 12, y: 0, stepX: 120 }
    });
  
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.body.setGravityY(100); // Individual gravity
    });
  
    // spikes
spikes = this.physics.add.group();

const spike1 = spikes.create(300, 0, 'spike');
const spike2 = spikes.create(500, 0, 'spike');

spikes.children.iterate((spike) => {
  spike.setBounce(1); // Full bounce
  spike.setCollideWorldBounds(true); // So it doesn't disappear
  spike.setVelocity(Phaser.Math.Between(-100, 100), 20); // Some motion
  spike.allowGravity = true;
});

    // collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(spikes, platforms);
  
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, spikes, hitSpike, null, this);
  
    // score text
    scoreText = this.add.text(16, 16, 'Stars: 0', { fontSize: '24px', fill: '#fff' });
  }
  
  function update() {
    if (gameOver) return;
  
    player.setVelocityX(0);
  
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    }
  
    // Fixed jump input using .blocked.down
    if (Phaser.Input.Keyboard.JustDown(spaceKey) && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
  }
  
  function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Stars: ' + score);
  }
  
  function hitSpike(player, spike) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
  }
  