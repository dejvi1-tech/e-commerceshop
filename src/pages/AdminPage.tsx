import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { Plus, Edit, Trash2, Download, Upload } from 'lucide-react';

export const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('admin-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Load from main products file
      import('../data/products').then(({ products: defaultProducts }) => {
        setProducts(defaultProducts);
        localStorage.setItem('admin-products', JSON.stringify(defaultProducts));
      });
    }
  };

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
  };

  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'products.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProducts = JSON.parse(e.target?.result as string);
          saveProducts(importedProducts);
        } catch (error) {
          alert('Error importing products. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      id: '',
      slug: '',
      title: '',
      brand: '',
      category: 'phones',
      description: '',
      price: 0,
      inStock: true,
      colors: [{ name: '', hex: '#000000', images: [] }],
      images: [],
      specs: {}
    });
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.title || !formData.brand) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = formData as Product;

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }

    saveProducts(updatedProducts);
    setIsModalOpen(false);
    setFormData({});
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addColor = () => {
    const colors = formData.colors || [];
    updateFormField('colors', [...colors, { name: '', hex: '#000000', images: [] }]);
  };

  const removeColor = (index: number) => {
    const colors = formData.colors || [];
    updateFormField('colors', colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, field: string, value: any) => {
    const colors = [...(formData.colors || [])];
    colors[index] = { ...colors[index], [field]: value };
    updateFormField('colors', colors);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const readers = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(dataUrls => {
      updateFormField('images', dataUrls);
    });
  };

  const handleColorImageUpload = (colorIndex: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const readers = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(dataUrls => {
      updateColor(colorIndex, 'images', dataUrls);
    });
  };

  const removeImage = (index: number) => {
    const images = [...(formData.images || [])];
    images.splice(index, 1);
    updateFormField('images', images);
  };

  const removeColorImage = (colorIndex: number, imageIndex: number) => {
    const colors = [...(formData.colors || [])];
    const colorImages = [...colors[colorIndex].images];
    colorImages.splice(imageIndex, 1);
    colors[colorIndex].images = colorImages;
    updateFormField('colors', colors);
  };

  const reorderImages = (dragIndex: number, hoverIndex: number) => {
    const images = [...(formData.images || [])];
    const draggedImage = images[dragIndex];
    images.splice(dragIndex, 1);
    images.splice(hoverIndex, 0, draggedImage);
    updateFormField('images', images);
  };

  const reorderColorImages = (colorIndex: number, dragIndex: number, hoverIndex: number) => {
    const colors = [...(formData.colors || [])];
    const colorImages = [...colors[colorIndex].images];
    const draggedImage = colorImages[dragIndex];
    colorImages.splice(dragIndex, 1);
    colorImages.splice(hoverIndex, 0, draggedImage);
    colors[colorIndex].images = colorImages;
    updateFormField('colors', colors);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Admin</h1>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
              <Upload size={20} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importProducts}
                className="hidden"
              />
            </label>
            <button
              onClick={exportProducts}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Download size={20} />
              Export
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Brand</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-700">
                  <td className="p-4">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-600 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                          if (product.images[0]) {
                            window.open(product.images[0], '_blank');
                          }
                        }}
                      />
                      {product.images.length > 1 && (
                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {product.images.length}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 capitalize">{product.category}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.inStock ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ID*</label>
                      <input
                        type="text"
                        value={formData.id || ''}
                        onChange={(e) => updateFormField('id', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug*</label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => updateFormField('slug', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Title*</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => updateFormField('title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Brand*</label>
                      <input
                        type="text"
                        value={formData.brand || ''}
                        onChange={(e) => updateFormField('brand', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category*</label>
                      <select
                        value={formData.category || 'phones'}
                        onChange={(e) => updateFormField('category', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                      >
                        <option value="phones">Phones</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price*</label>
                      <input
                        type="number"
                        value={formData.price || 0}
                        onChange={(e) => updateFormField('price', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => updateFormField('description', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Product Images</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {(formData.images || []).map((image, index) => (
                        <div
                          key={index}
                          className="relative group cursor-move"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', index.toString());
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                            if (dragIndex !== index) {
                              reorderImages(dragIndex, index);
                            }
                          }}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-500 transition-colors">
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => {
                                // Open image in new tab for full view
                                window.open(image, '_blank');
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Remove image"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="product-images"
                      />
                      <label htmlFor="product-images" className="cursor-pointer">
                        <div className="text-slate-400 mb-2">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-300">Click to upload product images</p>
                        <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 10MB each</p>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Compare At Price</label>
                      <input
                        type="number"
                        value={formData.compareAtPrice || ''}
                        onChange={(e) => updateFormField('compareAtPrice', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating || ''}
                        onChange={(e) => updateFormField('rating', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock || false}
                        onChange={(e) => updateFormField('inStock', e.target.checked)}
                        className="rounded"
                      />
                      In Stock
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Colors</label>
                    {(formData.colors || []).map((color, index) => (
                      <div key={index} className="mb-4 p-4 bg-slate-800 rounded-lg">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Color name"
                            value={color.name}
                            onChange={(e) => updateColor(index, 'name', e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                          />
                          <input
                            type="color"
                            value={color.hex}
                            onChange={(e) => updateColor(index, 'hex', e.target.value)}
                            className="w-16 h-10 bg-slate-700 border border-slate-600 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeColor(index)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-3">Color Images</label>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                            {(color.images || []).map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative group cursor-move"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('text/plain', `${index}-${imgIndex}`);
                                  e.dataTransfer.effectAllowed = 'move';
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = 'move';
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const [colorIdx, dragIndex] = e.dataTransfer.getData('text/plain').split('-').map(Number);
                                  if (colorIdx === index && dragIndex !== imgIndex) {
                                    reorderColorImages(index, dragIndex, imgIndex);
                                  }
                                }}
                              >
                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-500 transition-colors">
                                  <img
                                    src={image}
                                    alt={`Color ${color.name} ${imgIndex + 1}`}
                                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => {
                                      window.open(image, '_blank');
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeColorImage(index, imgIndex)}
                                  className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  title="Remove image"
                                >
                                  ×
                                </button>
                                <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                  {imgIndex + 1}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleColorImageUpload(index, e.target.files)}
                              className="hidden"
                              id={`color-images-${index}`}
                            />
                            <label htmlFor={`color-images-${index}`} className="cursor-pointer">
                              <div className="text-slate-400 mb-1">
                                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                              <p className="text-xs text-slate-300">Add images for {color.name || 'this color'}</p>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addColor}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                    >
                      Add Color
                    </button>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      {editingProduct ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};