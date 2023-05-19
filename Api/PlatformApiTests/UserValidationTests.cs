using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlatformApi;
using PlatformApi.Models;
using static PlatformApi.Services.UserService;
namespace PlatformApiTests
{
    [TestClass]
    public class UserValidationTests
    {
        [TestMethod]
        public void ValidateUser_WhenUserIsNull_ThrowsException()
        {
            // Arrange
            User user = null;

            // Act & Assert
            Assert.ThrowsException<Exception>(() => ValidateUser(user), "Пользователь не найден");
        }

        [TestMethod]
        public void ValidateUser_WhenUserInfoIsNull_ThrowsException()
        {
            // Arrange
            User user = new User();

            // Act & Assert
            Assert.ThrowsException<Exception>(() => ValidateUser(user), "Пользовательская информация не найдена");
        }

        [TestMethod]
        public void ValidateUser_WhenUserIsValid_DoesNotThrowException()
        {
            // Arrange
            User user = new User { UserInfo = new UserInfo() };

            // Act & Assert
            try
            {
                ValidateUser(user);
            }catch(Exception ex)
            {
                Assert.Fail(ex.Message);
            }
        }
    }
}
