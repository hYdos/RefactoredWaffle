type ProjectInfo = {
    availableNamespaces: string[]
    assets: {
        blockStates: any[]
        blockModels: string[]
        itemModels: string[]
        langFiles: string[]
        sounds: string[]
        textures: any[]
    }
    data: {
        dimensions: string[],
        dimensionKeys: string[],
        advancements: string[],
        recipes: string[],
        tags: string[]
    }
}
