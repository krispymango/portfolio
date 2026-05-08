class mapManager {
    constructor(scene){
        this.scene = scene;
    }

    //--------------------------------------------------
    // BUILD WALKABILITY FROM TERRAIN TILE PROPERTIES
    //--------------------------------------------------
    generateGrid(mapData,groundLayer) {
        let width = mapData.width;
        let height = mapData.height;
        let gridData = [];

        for (let y = 0; y < height; y++) {
            let row = [];

            for (let x = 0; x < width; x++) {
                const tile = groundLayer.getTileAt(x, y);

                if (!tile) {
                    row.push(1);
                    continue;
                }

                const isBlocked =
                    tile.properties.walkable === false ? true : false;

                row.push(isBlocked ? 1 : 0);
            }

            gridData.push(row);
        }

        return gridData;
    }

    //--------------------------------------------------
    // LOAD POI FROM ANY TILEMAP
    //--------------------------------------------------
    loadPOIForMap(mapData) {
        const poiData = {};
        const objects = mapData.getObjectLayer("Markers")?.objects || [];

        objects.forEach(obj => {
            // Check if object is a rectangle or a point
            const isPoint = !obj.width && !obj.height;

            // Width and height for physics / pathfinding (fallback to 16)
            const width = obj.width || 16;
            const height = obj.height || 16;

            // Center only if not a point
            const worldX = isPoint ? obj.x : obj.x + width / 2;
            const worldY = isPoint ? obj.y : obj.y + height / 2;

            // Tile coordinates for pathfinding / logic
            const tx = Math.floor(worldX / mapData.tileWidth);
            const ty = Math.floor(worldY / mapData.tileHeight);

            // Parse custom properties
            let typeName = null, 
                posXName = null, 
                posYName = null,
                impYName = null,
                titleName = null;

            if (obj.properties?.length) {
                typeName = obj.properties.find(p => p.name === "type")?.value ?? null;
                posXName = obj.properties.find(p => p.name === "pos_x")?.value ?? null;
                posYName = obj.properties.find(p => p.name === "pos_y")?.value ?? null;
                impYName = obj.properties.find(p => p.name === "imp")?.value ?? null;
                titleName = obj.properties.find(p => p.name === "title")?.value ?? null;
            }

            // Normalize POI name
            const poiKey = obj.name.toLowerCase();

            // Store POI
            poiData[poiKey] = {
                x: tx,
                y: ty,
                worldX,
                worldY,
                width,
                height,
                title: titleName,
                pos_x: posXName,
                pos_y: posYName,
                imp: impYName,
                type: typeName
            };
        });

        //console.log('poiData: ',poiData);
        
        return poiData;
    }

    getPoiByInteriorId(interiorId,building,overworldPoi) {
        if (!interiorId) return null;

        return Object.values(overworldPoi).find(poi =>
            poi.interiorId === interiorId && poi.building === building
        ) || null;
    }

    parseItems(input) {
        if (input == null) return null;

        // Already parsed (safety)
        if (Array.isArray(input) || typeof input === "object") {
            return input;
        }

        if (typeof input !== "string") return null;

        const trimmed = input.trim();

        if (!trimmed) return null;

        try {
            // ✅ 1. Proper JSON (array or object)
            if (
                (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
                (trimmed.startsWith("{") && trimmed.endsWith("}"))
            ) {
                return JSON.parse(trimmed);
            }

            // ✅ 2. Comma-separated list → array
            if (trimmed.includes(",") && !trimmed.includes(":")) {
                return trimmed
                    .split(",")
                    .map(v => v.trim())
                    .filter(Boolean);
            }

            // 🛠 3. Loose object syntax → JSON object
            let fixed = trimmed;

            // Quote keys
            fixed = fixed.replace(
                /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g,
                '$1"$2":'
            );

            // Add commas between string values
            fixed = fixed.replace(/"\s+"/g, '", "');

            // Wrap as object if needed
            if (!fixed.startsWith("{")) fixed = `{${fixed}`;
            if (!fixed.endsWith("}")) fixed += "}";

            return JSON.parse(fixed);

        } catch (err) {
            //console.warn("❌ Invalid items format:", input, err);
            return null;
        }
    }



}


window.mapManager = mapManager;