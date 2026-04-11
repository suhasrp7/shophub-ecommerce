export const categories = [
  { id: 1, name: 'Electronics', icon: 'laptop', productCount: 45 },
  { id: 2, name: 'Accessories', icon: 'headphones', productCount: 32 },
  { id: 3, name: 'Furniture', icon: 'couch', productCount: 18 },
  { id: 4, name: 'Cameras', icon: 'camera', productCount: 24 },
  { id: 5, name: 'Audio', icon: 'music', productCount: 28 },
  { id: 6, name: 'Gaming', icon: 'gamepad', productCount: 15 }
]

export const getCategoryIcon = (iconName) => {
  const icons = {
    laptop: 'fa-laptop',
    headphones: 'fa-headphones',
    couch: 'fa-couch',
    camera: 'fa-camera',
    music: 'fa-music',
    gamepad: 'fa-gamepad'
  }
  return icons[iconName] || 'fa-folder'
}
