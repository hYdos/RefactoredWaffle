type ProjectInfo = {
    availableNamespaces: string[]
    assets: {
        blockStates: any[]
        blockModels: string[]
        itemModels: string[]
        langFiles: string[]
        sounds: string[]
        textures: string[]
    }
    data: {
        dimensions: string[],
        dimensionKeys: string[],
        advancements: string[],
        recipes: string[],
        tags: string[]
    }
}
