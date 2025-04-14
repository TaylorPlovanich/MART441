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
      preload,
      create,
      update
    }
  };
  
  let player, stars, spikes, cursors, scoreText, levelText;
  let score = 0;
  let level = 1;
  let gameOver = false;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/ground.jpg');
    this.load.image('star', 'images/star.png');
    this.load.image('spike', 'images/spike.png');
    this.load.image('player', 'images/player.png');
  }
  
  function create() {
    this.add.image(400, 300, 'sky');
  
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(1.6, 1).refreshBody();
  
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    cursors = this.input.keyboard.createCursorKeys();
  
    // Stars fall from the sky and land on ground
    stars = this.physics.add.group({
      key: 'star',
      repeat: 5,
      setXY: { x: 12, y: 100, stepX: 120 }
    });
  
    stars.children.iterate(star => {
      star.setBounceY(0.2);
      star.setGravityY(100);
    });
  
    spikes = this.physics.add.group();
    const spike = spikes.create(400, 16, 'spike');
    spike.setBounce(1);
    spike.setCollideWorldBounds(true);
    spike.setVelocity(Phaser.Math.Between(-200, 200), 20);
  
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(spikes, platforms);
  
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, spikes, hitSpike, null, this);
  
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });
    levelText = this.add.text(700, 16, 'Lvl: 1', { fontSize: '20px', fill: '#000' });
  }
  
  function update() {
    if (gameOver) return;
  
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }
  
    if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  
  function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
  
    if (stars.countActive(true) === 0) {
      level += 1;
      levelText.setText('Lvl: ' + level);
  
      // Reset stars for next level
      stars.children.iterate(star => {
        star.enableBody(true, star.x, 100, true, true);
        star.setBounceY(0.2);
        star.setGravityY(100);
      });
  
      // Add a new spike
      const newSpike = spikes.create(Phaser.Math.Between(0, 800), 16, 'spike');
      newSpike.setBounce(1);
      newSpike.setCollideWorldBounds(true);
      newSpike.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
  
  function hitSpike(player, spike) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
  }
  