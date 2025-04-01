const { isValidObjectId } = require("mongoose");
const Note = require("../models/note.model");


// @route /notes
// @method GET
const getAllNotes = async (req, res) => {
  const notes = await Note.find({ author: req.userId }).select("-__v -author");
  if (!notes.length) return res.status(204).json({ message: "No notes found" });
  res.json(notes);
};


// @route /notes
// @method POST
const createNewNote = async (req, res) => {
  let { title, body, color } = req.body;
  title = title?.trim();
  body = body?.trim();
  color = color?.trim().toLowerCase();
  // check if title is provided
  if (!title) return res.status(400).json({ message: "Title is required" });
  const note = await Note.create({ title, body, color, author: req.userId });
  res.json(note);
};


// @route /notes/:id
// @method GET
const getNoteById = async (req, res) => {
  const { id } = req.params;
  // check if id is valid
  if (!isValidObjectId(id)) return res.status(400).json({ message: "Note Id note valid" });
  const note = await Note.findById(id).select("-__v").lean();
  // check if note belong to user
  if (note.author.toString() !== req.userId) return res.status(401).json({ message: "Unauthorized" });
  // check if note exists, if yes return to client
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};


// @route /note/:id
// @method PATCH
const updateNote = async (req, res) => {
  const { id } = req.params;
  // check if id is valid
  if (!isValidObjectId(id)) return res.status(400).json({ message: "Note Id note valid" });
  let { title, body } = req.body;
  title = title?.trim();
  body = body?.trim();
  // check if title is provided
  if (!title) return res.status(400).json({ message: "Title is required" });
  const note = await Note.findById(id);
  // check if note exists
  if (!note) return res.status(404).json({ message: "Note not found" });
  // check if note belong to user
  if (note.author.toString() !== req.userId) return res.status(401).json({ message: "Unauthorized" });
  // update note & save
  note.title = title;
  note.body = body;
  await note.save();
  // find updated note and return to client
  const updatedNote = await Note.findById(id).lean();
  res.json(updatedNote);
};


// @route /note/:id
// @method DELETE
const deleteNote = async (req, res) => {
  const { id } = req.params;
  // check if id is valid
  if (!isValidObjectId(id)) return res.status(400).json({ message: "Note Id note valid" });
  const note = await Note.findById(id).lean();
  // check if note exists
  if (!note) return res.status(404).json({ message: "Note not found" });
  // check if note belong to user
  if (note.author.toString() !== req.userId) return res.status(401).json({ message: "Unauthorized" });
  // delete note
  await Note.deleteOne({ _id: id, author: req.userId });
  res.sendStatus(204);
};

module.exports = {
  getAllNotes,
  createNewNote,
  getNoteById,
  updateNote,
  deleteNote,
};