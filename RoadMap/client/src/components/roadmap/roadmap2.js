import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './styles.css';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Courses from '../Courses/Courses';
import RoadmapHeader from '../FinalRoadmap/Header';

import data from './output1.json'; // Assuming this file contains your JSON data
import Feedback from '../FeedBack';

// Function to generate colors in a gradient from light to dark blue
const getColorByIndex = (index, label) => {
  if(label.includes('(already'))return "#71797E"
  const baseColor = '#0077B5'; // LinkedIn blue base color
  const increment = 3; // Adjust increment to control color darkness more gradually

  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  // Calculate new RGB values with adjusted increment
  const newR = Math.min(255, r + increment * index);
  const newG = Math.min(255, g + increment * index);
  const newB = Math.min(255, b + increment * index);

  return `rgb(${newR}, ${newG}, ${newB})`;
};

// NodeComponent with dynamic color based on label content
const NodeComponent = ({ data }) => {
  const handleAddNode = () => {
    console.log('Add node clicked for:', data.label);
    // Implement logic to add a new node related to this node
  };

  // Determine node color based on label content
  const nodeColor = data.label.includes('(') ? '#4CAF50' : data.color;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="body2" style={{ marginBottom: 5, color: '#fff' }}>{data.label}</Typography>
      <Tooltip title="Add Node" arrow>
        <IconButton onClick={handleAddNode} size="small">
          <AddIcon />
        </IconButton>
      </Tooltip>
      {/* Apply dynamic color based on label content */}
      <div style={{ width: 20, height: 20, backgroundColor: nodeColor, marginTop: 5 }}></div>
    </div>
  );
};

function RoadmapPage() {
  // const jsonData = sessionStorage.getItem('learningPath');

  const parsedJsonData = data;

  const steps = parsedJsonData.map(item => item.field);

  const elements = {
    nodes: [],
    edges: []
  };

  let previousLastNode = null;

  // Mapping skills_required to nodes and edges
  parsedJsonData.forEach((item, index) => {
    // Main node for the field
    const mainNodeId = `${item.field}-field`;
    const fieldColor = getColorByIndex(index,item.field); // Get color for current field

    elements.nodes.push({
      id: mainNodeId,
      type: 'main',
      data: {
        label: item.field,
        // color: fieldColor // Assign color to the main node data
      },
      position: {
        x: 100 + index * 300, // Adjust horizontal spacing
        y: 100
      },
      style: {
        backgroundColor: "#ffA500", // Set background color dynamically
        color: '#000',
        padding: 10,
        fontWeight:"700"
      }
    });

    // Sub nodes for each skill under the field
    item.skills.forEach((skill, skillIndex) => {
      let currentSubNodeId;
      // const skillColor2 = getColorByIndex(skillIndex,item.skills); // Get color for current skill

      if (Array.isArray(skill)) {
        // Handle array of skills
        skill.forEach((subSkill, subSkillIndex) => {
          currentSubNodeId = `${mainNodeId}-${skillIndex}-${subSkillIndex}`;

          const skillColor2 = getColorByIndex(skillIndex,subSkill);

          elements.nodes.push({
            id: currentSubNodeId,
            type: 'sub',
            data: {
              label: Array.isArray(subSkill) ? subSkill.join(', ') : subSkill,
              color: skillColor2 // Assign color to the sub node data
            },
            position: {
              x: 100 + index * 300,
              y: 200 + skillIndex * 150 + subSkillIndex * 60 // Adjust vertical spacing
            },
            style: {
              backgroundColor: skillColor2, // Set background color dynamically
              color: '#fff', // White text color
              padding: 10
            }
          });

          if (subSkillIndex === 0 && previousLastNode) {
            // Connect to the last node of the previous field
            elements.edges.push({
              id: `e-${previousLastNode}-${currentSubNodeId}`,
              source: previousLastNode,
              target: currentSubNodeId,
              style:{stroke: '#000000'},
              animated: true
            });
          } else if (subSkillIndex > 0) {
            // Connect to previous sub node in the same skill
            elements.edges.push({
              id: `e-${mainNodeId}-${skillIndex}-${subSkillIndex}`,
              source: `${mainNodeId}-${skillIndex}-${subSkillIndex - 1}`,
              target: currentSubNodeId,
              style:{stroke: '#000000'},
              animated: true
            });
          }
        });
      } else if (typeof skill === 'object') {
        // Handle object of skills
        Object.keys(skill).forEach((key, objIndex) => {
          currentSubNodeId = `${mainNodeId}-${skillIndex}-${key}`;

          const skillColor2 = getColorByIndex(skillIndex,key);

          elements.nodes.push({
            id: currentSubNodeId,
            type: 'sub',
            data: {
              label: key,
              color: skillColor2 // Assign color to the sub node data
            },
            position: {
              x: 100 + index * 300,
              y: 200 + skillIndex * 150 + objIndex * 60 // Adjust vertical spacing
            },
            style: {
              backgroundColor: skillColor2, // Set background color dynamically
              color: '#fff', // White text color
              padding: 10
            }
          });

          if (objIndex === 0 && previousLastNode) {
            // Connect to the last node of the previous field
            elements.edges.push({
              id: `e-${previousLastNode}-${currentSubNodeId}`,
              source: previousLastNode,
              target: currentSubNodeId,
              style:{stroke: '#000000'},
              animated: true
            });
          } else if (objIndex > 0) {
            // Connect to previous sub node in the same skill
            elements.edges.push({
              id: `e-${mainNodeId}-${skillIndex}-${key}`,
              source: `${mainNodeId}-${skillIndex}-${Object.keys(skill)[objIndex - 1]}`,
              target: currentSubNodeId,
              style:{stroke: '#000000'},
              animated: true
            });
          }

          // Sub-sub nodes for each value in the object
          skill[key].forEach((value, valueIndex) => {
            const subSubNodeId = `${currentSubNodeId}-${valueIndex}`;
            const skillColor2 = getColorByIndex(skillIndex,value);
            elements.nodes.push({
              id: subSubNodeId,
              type: 'sub-sub',
              data: {
                label: Array.isArray(value) ? value.join(', ') : value,
                color: skillColor2 // Assign color to the sub-sub node data
              },
              position: {
                x: 150 + index * 300,
                y: 260 + skillIndex * 150 + objIndex * 60 + valueIndex * 40 // Adjust vertical spacing
              },
              style: {
                backgroundColor: skillColor2, // Set background color dynamically
                color: '#fff', // White text color
                padding: 10
              }
            });

            // Connect sub node to sub-sub node
            elements.edges.push({
              id: `e-${currentSubNodeId}-${valueIndex}`,
              source: currentSubNodeId,
              target: subSubNodeId,
              style:{stroke: '#000000'},
              animated: true
            });
          });
        });
      } else {
        // Handle single skill string
        currentSubNodeId = `${mainNodeId}-${skillIndex}`;

        const skillColor2 = getColorByIndex(skillIndex,skill);

        elements.nodes.push({
          id: currentSubNodeId,
          type: 'sub',
          data: {
            label: skill,
            color: skillColor2 // Assign color to the sub node data
          },
          position: {
            x: 100 + index * 300,
            y: 200 + skillIndex * 150 // Adjust vertical spacing
          },
          style: {
            backgroundColor: skillColor2, // Set background color dynamically
            color: '#fff', // White text color
            padding: 10
          }
        });

        if (skillIndex === 0 && previousLastNode) {
          // Connect to the last node of the previous field
          elements.edges.push({
            id: `e-${previousLastNode}-${currentSubNodeId}`,
            source: previousLastNode,
            target: currentSubNodeId,
            style:{stroke: '#000000'},
            animated: true
          });
        } else if (skillIndex > 0) {
          // Connect to previous sub node in the same skill
          elements.edges.push({
            id: `e-${mainNodeId}-${skillIndex}`,
            source: `${mainNodeId}-${skillIndex - 1}`,
            target: currentSubNodeId,
            style:{stroke: '#000000'},
            animated: true
          });
        }
      }

      previousLastNode = currentSubNodeId; // Update the previous last node ID
    });

    // After processing all skills of the current field, connect the last skill node to the first skill node of the next field
    if (index < parsedJsonData.length - 1) {
      const nextFieldFirstNode = `${parsedJsonData[index + 1].field}-field-0`;
      elements.edges.push({
        id: `e-${previousLastNode}-${nextFieldFirstNode}`,
        source: previousLastNode,
        target: nextFieldFirstNode
      });
    }
  });

  console.log(elements.nodes);
  console.log(elements.edges);

  const [nodes, setNodes, onNodesChange] = useNodesState(elements.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(elements.edges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const [selectedNode, setSelectedNode] = useState(null); // State to store the selected node
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');


  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <RoadmapHeader role={roleParam} steps={steps} />
      <div style={{ width: '80vw', height: '80vh', border: '2px solid', margin: '24px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // colorMode="dark"
          onNodeClick={handleNodeClick} // Attach onNodeClick handler
        >
          <Controls />
          {/* Ensure MiniMap receives valid node data */}
          <MiniMap nodeColor={(node) => node.data.color || '#ffffff'} />
          <Background variant='dots' gap={12} size={1} />
        </ReactFlow>

        {/* Dialog for showing node details */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle fontWeight={"900px"}>{selectedNode?.data.label}</DialogTitle>
          <DialogContent>
            {/* Add your content here, e.g., links, descriptions */}
            <p>Additional information about {selectedNode?.data.label}</p>
            <p>Total Duration: 18 hrs (approx.)</p>
            <Courses label={selectedNode?.data.label}></Courses>
            {/* Replace with your component for displaying node details */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Feedback />
    </Container>
  );
}

export default RoadmapPage;
