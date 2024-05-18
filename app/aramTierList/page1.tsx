// 'use client'
// import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
// import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { champions } from '../data/champions'; // 챔피언 데이터 파일을 불러옴

// const ItemType = {
//   IMAGE: 'image',
// };

// interface DragItem {
//   id: string;
//   index: number;
//   type: string;
// }

// interface ImageComponentProps {
//   id: string;
//   src: string;
//   index: number;
//   moveImage: (dragIndex: number, hoverIndex: number) => void;
// }

// interface TierProps {
//   title: string;
//   tier: string[];
//   setTier: Dispatch<SetStateAction<string[]>>;
//   onDrop: (id: string) => void;
// }

// const ImageComponent: React.FC<ImageComponentProps> = ({ id, src, index, moveImage }) => {
//   const ref = useRef<HTMLImageElement>(null);

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType.IMAGE,
//     item: { id, index },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   const [, drop] = useDrop<DragItem>({
//     accept: ItemType.IMAGE,
//     hover(item: DragItem, monitor: DropTargetMonitor) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }

//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }

//       moveImage(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   drag(drop(ref));

//   return (
//     <img
//       ref={ref}
//       src={src}
//       style={{ opacity: isDragging ? 0.5 : 1, margin: '5px', cursor: 'move' }}
//       width={50}
//       height={50}
//     />
//   );
// };

// const Tier: React.FC<TierProps> = ({ title, tier, setTier, onDrop }) => {
//   const [, drop] = useDrop({
//     accept: ItemType.IMAGE,
//     drop: (item: DragItem) => {
//       onDrop(item.id);
//     },
//   });

//   const ref = useRef<HTMLDivElement>(null);

//   drop(ref);

//   const moveImage = (dragIndex: number, hoverIndex: number) => {
//     const updatedTier = [...tier];
//     const [removed] = updatedTier.splice(dragIndex, 1);
//     updatedTier.splice(hoverIndex, 0, removed);
//     setTier(updatedTier);
//   };

//   return (
//     <div ref={ref} style={{ margin: '10px', padding: '10px', border: '1px solid black', minHeight: '100px', width: '100%' }}>
//       <h2>{title}</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {tier.map((id, index) => (
//           <ImageComponent key={id} id={id} src={id} index={index} moveImage={moveImage} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const AramTierList: React.FC = () => {
//   const [sTier, setSTier] = useState<string[]>([]);
//   const [aTier, setATier] = useState<string[]>([]);
//   const [bTier, setBTier] = useState<string[]>([]);
//   const [cTier, setCTier] = useState<string[]>([]);
//   const [xTier, setXTier] = useState<string[]>([]);
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     const imagePaths = Object.values(champions.data).map(champion => `/championE/${champion.image.full}`);
//     setImages(imagePaths);
//     setXTier(imagePaths); // 초기 상태에서 xTier에 모든 이미지를 설정
//   }, []);

//   const handleDrop = (tierSetter: React.Dispatch<React.SetStateAction<string[]>>, id: string) => {
//     setSTier(prev => prev.filter(img => img !== id));
//     setATier(prev => prev.filter(img => img !== id));
//     setBTier(prev => prev.filter(img => img !== id));
//     setCTier(prev => prev.filter(img => img !== id));
//     setXTier(prev => prev.filter(img => img !== id));
//     tierSetter(prev => [...prev, id]);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <h1>ARAM Tier List</h1>
//         <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//           <Tier title="S Tier" tier={sTier} setTier={setSTier} onDrop={(id) => handleDrop(setSTier, id)} />
//           <Tier title="A Tier" tier={aTier} setTier={setATier} onDrop={(id) => handleDrop(setATier, id)} />
//           <Tier title="B Tier" tier={bTier} setTier={setBTier} onDrop={(id) => handleDrop(setBTier, id)} />
//           <Tier title="C Tier" tier={cTier} setTier={setCTier} onDrop={(id) => handleDrop(setCTier, id)} />
//           <Tier title="X Tier" tier={xTier} setTier={setXTier} onDrop={(id) => handleDrop(setXTier, id)} />
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default AramTierList;
