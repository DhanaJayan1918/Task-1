import socket

def scan_port(ip, port):
    """
    Attempts to connect to a specific port on a given IP.
    Returns True if the port is open, False otherwise.
    """
    try:
        # Create a new socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Set a timeout so the scan doesn't hang
        s.settimeout(1.0) 
        
        # connect_ex returns 0 if the connection is successful
        if s.connect_ex((ip, port)) == 0:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        s.close()

# --- Main part of the script ---
if __name__ == "__main__":
    
    # IMPORTANT: Change this to '127.0.0.1' to scan your own machine
    target_ip = "127.0.0.1"  # Scans 'localhost' (your computer)

    # A small list of common ports to check
    common_ports = [21, 22, 23, 25, 53, 80, 110, 443, 8080]

    print(f"Scanning target: {target_ip}...")
    
    open_ports = []

    for port in common_ports:
        print(f"Scanning port {port}...")
        if scan_port(target_ip, port):
            open_ports.append(port)
            print(f"*** Port {port} is OPEN ***")

    if not open_ports:
        print("\nNo common open ports found.")
    else:
        print(f"\nScan complete. Open ports: {open_ports}")