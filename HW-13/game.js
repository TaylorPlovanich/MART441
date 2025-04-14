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
  let stars;
  let spikes;
  let cursors;
  let spaceKey;
  let gameOver = false;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('star', 'images/star.png');
    this.load.image('spike', 'images/spike.png');
    this.load.image('player', 'images/your-character.png'); // use your sprite!
  }
  
  function create() {
    this.add.image(400, 300, 'sky');
  
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
    stars = this.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: 50, y: 0, stepX: 120 }
    });
  
    stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.body.setGravityY(100);
    });
  
    spikes = this.physics.add.group();
    spikes.create(400, 520, 'spike');
    spikes.create(600, 520, 'spike');
  
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
  