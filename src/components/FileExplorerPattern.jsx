import React, { useState } from "react";

const FileExplorerPattern = () => {
  const initialData = {
    id: "root",
    name: "Root",
    type: "folder",
    children: [
      {
        id: "1",
        name: "Documents",
        type: "folder",
        children: [
          { id: "2", name: "resume.pdf", type: "file" },
          { id: "3", name: "cover-letter.pdf", type: "file" }
        ]
      },
      {
        id: "4",
        name: "Photos",
        type: "folder",
        children: [{ id: "5", name: "vacation.jpg", type: "file" }]
      }
    ]
  };

  const [data, setData] = useState(initialData);
  const [expandedFolders, setExpandedFolders] = useState(new Set(["root"]));

  // toggle
  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      next.has(folderId) ? next.delete(folderId) : next.add(folderId);
      return next;
    });
  };

  // 🗑 DELETE (recursive)
  const deleteItem = (itemId) => {
    const removeNode = (node) => {
      if (!node.children) return node;

      const newChildren = node.children
        .filter((child) => child.id !== itemId) // remove here
        .map((child) => removeNode(child));     // go deeper

      return { ...node, children: newChildren };
    };

    setData((prev) => removeNode(prev));
  };

  // ➕ ADD
  const addItem = (parentId, type) => {
    const name = prompt(`Enter ${type} name`);
    if (!name) return;

    const newNode = {
      id: Date.now().toString(),
      name,
      type,
      children: type === "folder" ? [] : undefined
    };

    const insertNode = (node) => {
      if (node.id === parentId && node.type === "folder") {
        return { ...node, children: [...(node.children || []), newNode] };
      }

      if (!node.children) return node;

      return {
        ...node,
        children: node.children.map(insertNode)
      };
    };

    setData((prev) => insertNode(prev));
    setExpandedFolders((prev) => new Set(prev).add(parentId));
  };

  // render
  const RenderItem = ({ item }) => {
    const isFolder = item.type === "folder";
    const isExpanded = expandedFolders.has(item.id);

    return (
      <div style={{ marginLeft: 20 }}>
        <div>
          <span onClick={() => isFolder && toggleFolder(item.id)}>
            {isFolder ? (isExpanded ? "📂" : "📁") : "📄"} {item.name}
          </span>

          {isFolder && (
            <>
              <button onClick={() => addItem(item.id, "file")}>+File</button>
              <button onClick={() => addItem(item.id, "folder")}>+Folder</button>
            </>
          )}

          {item.id !== "root" && (
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          )}
        </div>

        {isFolder &&
          isExpanded &&
          item.children?.map((child) => (
            <RenderItem key={child.id} item={child} />
          ))}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <RenderItem item={data} />
    </div>
  );
};

export default FileExplorerPattern;
