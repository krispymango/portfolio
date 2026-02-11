class movementManager {
    constructor(scene, mapScale = 1) {
        this.scene = scene;
        this.mapScale = mapScale;
        this.mapOffset = { x: 0, y: 0 };
    }

    setMapOffset(x, y) {
        this.mapOffset = { x, y };
    }


    // -----------------------------
    // LOCK CHECK
    // -----------------------------
    isActionLocked(character) {
        return character?.actionState?.lockAction === true;
    }

    // -----------------------------
    // GRID PATH FOLLOW
    // -----------------------------
    followPathGrid(map, character, path, onComplete = null) {
        if (this.isActionLocked(character) || character.isMoving) {
            if (onComplete) onComplete();
            return;
        }

        const tileWidth  = map.tileWidth;
        const tileHeight = map.tileHeight;
        const moveDuration = character.walkSpeed;

        character.isMoving = true;

        const moveNextTile = () => {
            if (path.length === 0) {
                character.isMoving = false;
                this.applyIdleFrame(character);
                if (onComplete) onComplete();
                return;
            }

            const next = path.shift();

            // Calculate world position with scale AND offset
            const targetX = next.x * tileWidth * this.mapScale + tileWidth * this.mapScale / 2 + this.mapOffset.x;
            const targetY = next.y * tileHeight * this.mapScale + tileHeight * this.mapScale / 2 + this.mapOffset.y;

            const dx = targetX - character.x;
            const dy = targetY - character.y;

            this.applyGridWalkAnimation(character, dx, dy);

            this.scene.tweens.add({
                targets: character,
                x: targetX,
                y: targetY,
                duration: moveDuration,
                onComplete: moveNextTile
            });
        };

        moveNextTile();
    }


    // -----------------------------
    // GRID WALK ANIMATION + DIRECTION
    // -----------------------------
    applyGridWalkAnimation(character, dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                character.actionState.direction = 'right';
                character.anims.play(`${character.spriteKey}_walk_right`, true);
                character.setFlipX(false);
            } else {
                character.actionState.direction = 'left';
                character.anims.play(`${character.spriteKey}_walk_right`, true);
                character.setFlipX(true);
            }
        } else {
            if (dy > 0) {
                character.actionState.direction = 'down';
                character.anims.play(`${character.spriteKey}_walk_down`, true);
            } else {
                character.actionState.direction = 'up';
                character.anims.play(`${character.spriteKey}_walk_up`, true);
            }
        }
    }

    // -----------------------------
    // IDLE FRAME (GRID SAFE)
    // -----------------------------
    applyIdleFrame(character) {
        character.anims.stop();

        switch (character.actionState.direction) {
            case 'left':
                character.setFlipX(true);
                character.setFrame(8);
                break;
            case 'right':
                character.setFlipX(false);
                character.setFrame(8);
                break;
            case 'up':
                character.setFlipX(false);
                character.setFrame(16);
                break;
            default: // down
                character.setFlipX(false);
                character.setFrame(0);
                break;
        }
    }

 // -----------------------------
    // MOVE TO TILE (PUBLIC API)
    // -----------------------------
    moveCharacterToTile({ map, easystar, charactersById, characterId, tileX, tileY, callback = null }) {
        const character = charactersById[characterId];
        if (!character || character.isMoving) {
            if (callback) callback();
            return;
        }

        const tileWidth  = map.tileWidth;
        const tileHeight = map.tileHeight;

        // Subtract offset and divide by UNscaled tile size for pathfinding
        const startX = Math.floor((character.x - this.mapOffset.x) / (map.tileWidth * this.mapScale));
        const startY = Math.floor((character.y - this.mapOffset.y) / (map.tileHeight * this.mapScale));

        easystar.findPath(startX, startY, tileX, tileY, path => {
            if (!path || path.length === 0) {
                if (callback) callback();
                return;
            }

            path.shift(); // remove starting tile

            this.followPathGrid(map, character, path, callback);
        });

        easystar.calculate();
    }


}

window.movementManager = movementManager;
