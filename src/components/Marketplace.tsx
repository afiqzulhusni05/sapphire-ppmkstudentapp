import React, { useState } from 'react'
import { ShoppingBag, Search, Filter, Star, Plus, Minus, ShoppingCart, Heart, Package, CreditCard } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'preloved' | 'tickets' | 'fundraiser'
  seller: string
  rating: number
  reviews: number
  inStock: number
  isLiked: boolean
}

interface CartItem {
  product: Product
  quantity: number
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const products: Product[] = [
    {
      id: '1',
      name: 'Uniqlo Hoodie',
      description: 'Premium quality hoodie with logo in M size',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      category: 'preloved',
      seller: 'yyyy',
      rating: 4.8,
      reviews: 0,
      inStock: 1,
      isLiked: false
    },
    {
      id: '2',
      name: 'Tech Conference 2025 Ticket',
      description: 'Early bird ticket for the annual technology conference. Includes lunch and networking session.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      category: 'tickets',
      seller: 'Computer Science Club',
      rating: 4.9,
      reviews: 67,
      inStock: 15,
      isLiked: true
    },
    {
      id: '3',
      name: 'Environmental Awareness Tote Bag',
      description: 'Eco-friendly tote bag made from recycled materials. Support environmental initiatives.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'fundraiser',
      seller: 'Environmental Action Group',
      rating: 4.6,
      reviews: 89,
      inStock: 50,
      isLiked: false
    },
    {
      id: '4',
      name: 'Cultural Night Performance Ticket',
      description: 'Experience diverse cultures through music and dance. Premium seating available.',
      price: 15.00,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      category: 'tickets',
      seller: 'Cultural Society',
      rating: 4.7,
      reviews: 156,
      inStock: 8,
      isLiked: false
    },
    {
      id: '5',
      name: 'Photography Club Calendar 2024',
      description: 'Beautiful calendar featuring the best photos from our members. Limited edition.',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
      category: 'fundraiser',
      seller: 'Photography Club',
      rating: 4.5,
      reviews: 43,
      inStock: 30,
      isLiked: true
    },
    {
      id: '6',
      name: 'Gaming PC',
      description: 'Medium Tier Gaming PC used for only 1 month',
      price: 200.00,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      category: 'preloved',
      seller: 'lee',
      rating: 4.4,
      reviews: 0,
      inStock: 1,
      isLiked: false
    }
  ]

  const categories = ['all', 'preloved', 'tickets', 'fundraiser']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preloved': return 'bg-blue-100 text-blue-800'
      case 'tickets': return 'bg-purple-100 text-purple-800'
      case 'fundraiser': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PPMK Add2Cart</h2>
          <p className="text-gray-600">Shop preloved, tickets, and support fundraisers</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              <p className="text-gray-600">Products</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.category === 'preloved').length}</p>
              <p className="text-gray-600">preloved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.category === 'tickets').length}</p>
              <p className="text-gray-600">Event Tickets</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.category === 'fundraiser').length}</p>
              <p className="text-gray-600">Fundraisers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button className={`p-2 rounded-full ${product.isLiked ? 'bg-red-100' : 'bg-white bg-opacity-90'} hover:bg-opacity-100 transition-colors`}>
                  <Heart className={`w-4 h-4 ${product.isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">{product.inStock} in stock</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">by {product.seller}</span>
              </div>
              
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some products to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">${item.product.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total: ${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace
