
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Move } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

/** --- MOCK ONLY: Initial portfolio mock data --- */
const initialMockPortfolio = [
  {
    id: "1",
    image_url: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient"
  },
  {
    id: "2",
    image_url: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art"
  },
  {
    id: "3",
    image_url: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design"
  },
  {
    id: "4",
    image_url: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
    title: "Elegant Marble Pattern"
  },
];

/** --- Portfolio Item type --- */
type PortfolioItem = {
  id: string;
  image_url: string;
  title: string;
};

/** --- Main --- */
const ArtistPortfolioManager: React.FC = () => {
  // LOCAL, MOCK state management for portfolio
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialMockPortfolio);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  // --- Drag and drop handling ---
  function handleDragStart(idx: number) {
    setDragIdx(idx);
  }
  function handleDragOver(idx: number) {
    if (dragIdx === null || dragIdx === idx) return;
    const items = [...portfolio];
    const dragged = items.splice(dragIdx, 1)[0];
    items.splice(idx, 0, dragged);
    setPortfolio(items);
    setDragIdx(idx);
  }
  function handleDragEnd() {
    setDragIdx(null);
    toast.success("Portfolio reordered!");
  }

  // --- Add ---
  function handleAdd(newItem: PortfolioItem) {
    setPortfolio([{ ...newItem }, ...portfolio]);
    toast.success("Added new work to your portfolio!");
    setUploadOpen(false);
  }
  // Upload Modal logic
  function renderUploadModal() {
    const [file, setFile] = React.useState<File | null>(null);
    const [title, setTitle] = React.useState("");
    const [preview, setPreview] = React.useState<string | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const f = e.target.files?.[0];
      setFile(f || null);
      if (f) setPreview(URL.createObjectURL(f));
      else setPreview(null);
    }
    function handleAddClick() {
      if (!file || !title.trim()) return;
      // "Fake upload": create local URL, generate random id.
      handleAdd({
        id: `${Date.now()}-${Math.random()}`,
        image_url: preview!,
        title: title.trim()
      });
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl max-w-xs w-full p-6 shadow-2xl flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-center font-serif">Add New Work</h3>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm"
              onChange={handleFileChange}
            />
            {preview && (
              <img src={preview} className="mt-3 rounded-md w-full object-cover aspect-square" alt="Preview" />
            )}
          </div>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-200 rounded my-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={40}
          />
          <div className="flex justify-between gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddClick}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              disabled={!file || !title.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Edit ---
  function openEdit(idx: number) {
    setEditIdx(idx);
    setEditTitle(portfolio[idx].title);
  }
  function handleEditSave() {
    if (editIdx === null) return;
    if (!editTitle.trim()) return;
    setPortfolio(prev => {
      const arr = [...prev];
      arr[editIdx] = { ...arr[editIdx], title: editTitle.trim() };
      return arr;
    });
    setEditIdx(null);
    toast.success("Title updated!");
  }

  // --- Delete ---
  function confirmDelete(idx: number) {
    setDeleteIdx(idx);
  }
  function handleDelete() {
    if (deleteIdx === null) return;
    setPortfolio(portfolio.filter((_, i) => i !== deleteIdx));
    setDeleteIdx(null);
    toast.success("Portfolio item deleted");
  }

  return (
    <Card className="shadow-sm border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white pb-3">
        <CardTitle className="text-xl font-serif flex items-center">
          <svg className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth={2} d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14m18 0-4-4m4 4v-6m-4 2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2z"/></svg>
          My Portfolio
        </CardTitle>
        <Button
          onClick={() => setUploadOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New Work
        </Button>
      </CardHeader>
      
      <CardContent className="pt-4 pb-6">
        {/* EMPTY STATE */}
        {portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth={2} d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14m18 0-4-4m4 4v-6m-4 2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2z"/></svg>
            <div className="mb-3 text-gray-500 font-medium">
              No portfolio items yet
            </div>
            <Button
              onClick={() => setUploadOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Work
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {portfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={e => { e.preventDefault(); handleDragOver(idx); }}
                onDragEnd={handleDragEnd}
                className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all cursor-grab ${dragIdx === idx ? "ring-2 ring-purple-300 bg-purple-50" : ""}`}
                style={{ userSelect: "none", minHeight: 0 }}
              >
                {/* Image */}
                <div className="aspect-square">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-xl"
                    draggable={false}
                  />
                </div>
                {/* Overlay icons: EDIT + DELETE (pencil appears on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end px-3 py-3">
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-white/80 text-purple-800 rounded-full p-2 shadow hover:bg-white focus:outline-none transition-all mr-2"
                      onClick={e => { e.stopPropagation(); openEdit(idx); }}
                      style={{ opacity: 1, transition: 'opacity .25s' }}
                      aria-label="Edit portfolio item"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="bg-white/80 text-red-500 rounded-full p-2 shadow hover:bg-red-50 focus:outline-none transition-all"
                      onClick={e => { e.stopPropagation(); confirmDelete(idx); }}
                      aria-label="Delete portfolio item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {/* Title label */}
                <span className="absolute top-3 left-3 bg-white/80 text-purple-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm font-serif truncate max-w-[80%]">
                  {item.title}
                </span>
                {/* Drag handle (always visible on desktop, appears for touch) */}
                <span className="absolute bottom-3 right-3 bg-white/70 p-1 rounded-full shadow hidden sm:inline-flex">
                  <Move className="h-4 w-4 text-purple-400" />
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>

      {/* --- Add New Modal --- */}
      {uploadOpen && renderUploadModal()}
      {/* --- Edit Title Modal --- */}
      {editIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl max-w-xs w-full p-6 shadow-xl flex flex-col">
            <h3 className="text-lg font-semibold mb-3 font-serif text-center">Edit Title</h3>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm"
              autoFocus
            />
            <div className="flex justify-between gap-2 mt-5">
              <Button variant="outline" size="sm"
                onClick={() => setEditIdx(null)}>Cancel</Button>
              <Button
                onClick={handleEditSave}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                disabled={!editTitle.trim()}
              >Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl max-w-xs w-full p-6 shadow-lg text-center flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-red-600 font-serif">Delete portfolio item?</h3>
            <div className="text-gray-500 text-sm mb-4">
              This action cannot be undone.
            </div>
            <div className="flex justify-between gap-2">
              <Button variant="outline" size="sm"
                onClick={() => setDeleteIdx(null)}>Cancel</Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >Delete</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ArtistPortfolioManager;
