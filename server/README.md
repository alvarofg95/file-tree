# Instructions
Create a React *Single Page Application* to display a file tree representing the
actual server's filesystem exposed from a nodejs backend.

The root node for the tree should be specified by the client application.
Tree inodes should initially appear collapsed, with internal inodes Lazy loaded 
and rendered after expansion of the parent inode.  

Any representation for the tree is valid (graphical, text based, ...) as 
long as it shows clearly the hierarchical relationships between tree nodes.

The leaf nodes should allow the user to download the represented file on disk,
while those representing text or image files should also allow the user 
to display a preview of the file's content. 

You may
- Add any routes/actions to server
- Choose any set of server side operations to provide data to the client
- Use any data representation format for the information exchange
- Use any third party library

GreenPowerMonitor © 2021