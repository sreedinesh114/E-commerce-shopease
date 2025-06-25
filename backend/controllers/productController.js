import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ msg: 'Error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Not found' });
    res.json(product);
  } catch {
    res.status(500).json({ msg: 'Error fetching product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ msg: 'Created' });
  } catch {
    res.status(400).json({ msg: 'Create failed' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: 'Updated' });
  } catch {
    res.status(400).json({ msg: 'Update failed' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch {
    res.status(400).json({ msg: 'Delete failed' });
  }
};
