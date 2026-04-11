export const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9)

export const hashPassword = (password) => {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return 'hash_' + Math.abs(hash).toString(16)
}

export const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash
}

export const getStoredUsers = () => {
  const users = localStorage.getItem('shophub_users')
  return users ? JSON.parse(users) : []
}

export const saveUsers = (users) => {
  localStorage.setItem('shophub_users', JSON.stringify(users))
}

export const initializeAdminUser = () => {
  const users = getStoredUsers()
  if (!users.find(u => u.email === 'admin@shophub.com')) {
    users.push({
      id: 'admin_1',
      name: 'Admin',
      email: 'admin@shophub.com',
      password: hashPassword('admin123'),
      phone: '1234567890',
      address: '',
      role: 'admin',
      created_at: new Date().toISOString()
    })
    saveUsers(users)
  }
}

export const registerUser = (userData) => {
  const users = getStoredUsers()
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already exists')
  }
  
  const newUser = {
    id: generateId(),
    name: userData.name,
    email: userData.email,
    password: hashPassword(userData.password),
    phone: userData.phone || '',
    address: userData.address || '',
    role: 'customer',
    created_at: new Date().toISOString()
  }
  
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export const loginUser = (email, password) => {
  const users = getStoredUsers()
  const user = users.find(u => u.email === email)
  
  if (!user) {
    throw new Error('Invalid email or password')
  }
  
  if (user.password !== hashPassword(password)) {
    throw new Error('Invalid email or password')
  }
  
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const updateUser = (userId, updates) => {
  const users = getStoredUsers()
  const index = users.findIndex(u => u.id === userId)
  
  if (index === -1) {
    throw new Error('User not found')
  }
  
  users[index] = { ...users[index], ...updates }
  saveUsers(users)
  
  const { password: _, ...userWithoutPassword } = users[index]
  return userWithoutPassword
}

export const getAllUsers = () => {
  return getStoredUsers().map(({ password, ...user }) => user)
}

export const getUserById = (id) => {
  const users = getStoredUsers()
  const user = users.find(u => u.id === id)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export const emailExists = (email) => {
  const users = getStoredUsers()
  return users.some(u => u.email === email)
}
