export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
  
    // Automatically generate a new salt for each password
    const salt = crypto.getRandomValues(new Uint8Array(16));
  
    // Import the password as a key material for PBKDF2
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  
    // Derive the key using PBKDF2 with the generated salt
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  
    // Export the derived key as raw bytes
    const exportedKey = (await crypto.subtle.exportKey("raw", key)) as ArrayBuffer;
  
    // Convert the ArrayBuffer to a Uint8Array and then to a hex string
    const hashBuffer = new Uint8Array(exportedKey);
    const hashArray = Array.from(hashBuffer);
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  
    // Convert the salt to a hex string
    const saltHex = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  
    // Return the salt and hash concatenated with a colon
    return `${saltHex}:${hashHex}`;
  }
  
  export async function verifyPassword(
    storedHash: string,
    passwordAttempt: string
  ): Promise<boolean> {
    // Split the stored hash into salt and hash components
    const [saltHex, originalHash] = storedHash.split(":");
  
    // Convert the salt from hex back to a Uint8Array
    const matchResult = saltHex.match(/.{1,2}/g);
    if (!matchResult) {
      throw new Error("Invalid salt format");
    }
    const salt = new Uint8Array(matchResult.map((byte) => parseInt(byte, 16)));
  
    // Import the password attempt as key material for PBKDF2
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(passwordAttempt),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  
    // Derive the key using PBKDF2 with the stored salt
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  
    // Export the derived key as raw bytes
    const exportedKey = await crypto.subtle.exportKey("raw", key);
  
    // Convert the ArrayBuffer to a hex string
    const hashBuffer = new Uint8Array(exportedKey);
    const hashArray = Array.from(hashBuffer);
    const attemptHash = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  
    // Compare the computed hash with the stored hash
    return attemptHash === originalHash;
  }
  