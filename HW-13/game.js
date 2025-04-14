const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  let player, cursors, spaceKey, stars, spikes, platforms;
  let gameOver = false;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('star', 'images/star.png');
    this.load.image('spike', 'images/spike.png');
    this.load.image('player', 'images/stick-figure.png'); // your custom sprite
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
  
    // stars with gravity
    stars = this.physics.add.group({
      key: 'star',
      repeat: 7,
      setXY: { x: 12, y: 0, stepX: 100 }
    });
  
    stars.children.iterate(function (star) {
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      star.body.setGravityY(100);
    });
  
    // spikes
    spikes = this.physics.add.group();
    spikes.create(400, 520, 'spike');
    spikes.create(600, 520, 'spike');
  
    // collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(spikes, platforms);
    this.physics.add.overlap(player, spikes, hitSpike, null, this);
  }
  
  function update() {
    if (gameOver) return;
  
    player.setVelocityX(0);
  
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    }
  
    if (Phaser.Input.Keyboard.JustDown(spaceKey) && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  
  function hitSpike(player, spike) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
  }
  