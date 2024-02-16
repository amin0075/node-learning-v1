import prisma from "../db";

// GET all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: { products: true },
  });

  res.json({ data: user.products });
};

// GET one
export const getOnePRoduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// create
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// update
export const updateProduct = async (req, res) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id_belongToId: {
        belongToId: req.user.id,
        id: req.params.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updatedProduct });
};

// delete
export const deletedProduct = async (req, res) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id_belongToId: {
        belongToId: req.user.id,
        id: req.params.id,
      },
    },
  });

  res.json({ data: deletedProduct });
};
