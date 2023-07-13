using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CL
{
   public  class Utilities
    {


        public static byte[] key = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        public static byte[] iv = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

        public static string Encrypt(String text)
        {
            SymmetricAlgorithm algorithem = DES.Create();
            ICryptoTransform transform = algorithem.CreateEncryptor(key, iv);
            byte[] inputbuffer = Encoding.Unicode.GetBytes(text);
            byte[] outputbuffer = transform.TransformFinalBlock(inputbuffer, 0, inputbuffer.Length);

            return Convert.ToBase64String(outputbuffer);
        }


        public static string Decrypt(String text)
        {
            SymmetricAlgorithm algorithem = DES.Create();
            ICryptoTransform transform = algorithem.CreateEncryptor(key, iv);
            byte[] inputbuffer = Convert.FromBase64String(text);
            byte[] outputbuffer = transform.TransformFinalBlock(inputbuffer, 0, inputbuffer.Length);

            return Encoding.Unicode.GetString(outputbuffer);
        }


    }
}
